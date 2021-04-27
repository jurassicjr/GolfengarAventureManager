import AppError from "@shared/errors/AppError";
import { isBefore, parseISO } from "date-fns";
import { Collection, User } from "discord.js";
import { inject, injectable } from "tsyringe";
import { isUuid } from "uuidv4";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventureRepository from "../repositories/IAdventuresRepository";

interface IRequest {
  adventureIdentification: string;
  requester: string;
  sessionEndDate: string;
  goldReward: string;
  xpReward: string;
  report: string;
  participants: Collection<string, User>;
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
  }: IRequest): Promise<Adventure> {
    let adventure: Adventure | undefined;
    if (isUuid(adventureIdentification)) {
      adventure = await this.adventuresRepository.findByID(
        adventureIdentification,
      );
    } else {
      adventure = await this.adventuresRepository.findByName(
        adventureIdentification,
      );
    }

    if (!adventure)
      throw new AppError(
        "Não foi possiível encontrar a aventura informada pela nome ou ID por favor verifique",
      );
    if (requester !== adventure.dungeonMaster)
      throw new AppError(
        "Apenas o mestre que registrou essa sessão pode finalizar ela",
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
