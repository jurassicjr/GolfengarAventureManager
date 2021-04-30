import AppError from "@shared/errors/AppError";
import { isBefore, parseISO } from "date-fns";
import { Collection, User } from "discord.js";
import { inject, injectable } from "tsyringe";
import { isUuid } from "uuidv4";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventureRepository from "../repositories/IAdventuresRepository";

interface IRequest {
  adventureIdentification: string | undefined;
  requester: string;
  sessionEndDate: string;
  goldReward: string;
  xpReward: string;
  report: string;
  participants: Collection<string, User>;
  channelID: string;
}

@injectable()
export default class FinishAdventureService {
  constructor(
    @inject("AdventuresRepository")
    private adventuresRepository: IAdventureRepository,
  ) {}

  public async execute({
    adventureIdentification,
    report,
    goldReward,
    participants,
    requester,
    sessionEndDate,
    xpReward,
    channelID,
  }: IRequest): Promise<Adventure> {
    let adventure: Adventure | undefined;
    if (adventureIdentification) {
      if (isUuid(adventureIdentification)) {
        adventure = await this.adventuresRepository.findByID(
          adventureIdentification,
        );
      } else {
        adventure = await this.adventuresRepository.findByName(
          adventureIdentification,
        );
      }
    } else {
      adventure = await this.adventuresRepository.findByChannelID(channelID);
    }

    if (!adventure)
      throw new AppError(
        "Não foi possiível encontrar a aventura informada pela nome ou ID, e a mesma também não se encontra nesse canal por favor verifique",
      );
    if (requester !== adventure.dungeonMaster)
      throw new AppError(
        "Apenas o mestre que registrou essa sessão pode finaliza-la",
      );

    if (adventure.sessionEndDate)
      throw new AppError("Não é possível finalizar uma aventura já finalizada");

    const endDate = parseISO(sessionEndDate.replace(/"+/g, "").trim());
    if (isBefore(endDate, adventure.sessionStartDate)) {
      throw new AppError(
        "Você não pode finalizar uma sessão com uma data de termino anterior a data de inicio",
      );
    }
    adventure.report = report;
    adventure.goldReward = goldReward;
    adventure.participants = participants.map(participant => participant.id);
    adventure.sessionEndDate = endDate;
    adventure.XPReward = Number(xpReward);

    await this.adventuresRepository.save(adventure);

    return adventure;
  }
}
