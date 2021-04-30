import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { isUuid } from "uuidv4";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventureRepository from "../repositories/IAdventuresRepository";

interface IRequest {
  adventureIdentification: string | undefined;
  characterName: string;
  logLink: string;
  channelID: string;
}

@injectable()
export default class SubscribeToAdventureService {
  constructor(
    @inject("AdventuresRepository")
    private adventuresRepository: IAdventureRepository,
  ) {}

  public async execute({
    adventureIdentification,
    characterName,
    logLink,
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
          adventureIdentification.toLowerCase().trim(),
        );
      }
    } else {
      adventure = await this.adventuresRepository.findByChannelID(channelID);
    }

    if (!adventure) {
      throw new AppError(
        "Não foi possível inscrever você na missão solicitada, aparentemente ela não existe, por favor verifique o ID ou nome da aventura ou se está em um canal que tenha uma missão cadastrada.",
      );
    }

    if (adventure.sessionEndDate) {
      throw new AppError(
        "Essa sessão já foi encerrada, sendo assim, não é possivel mais realizar inscrições",
      );
    }

    if (
      adventure.playersLog &&
      adventure.playersLog.find(log => log === logLink)
    ) {
      throw new AppError(
        "Esse link de log já foi cadastrado nessa sessão por favor cadastre outro personagem.",
      );
    }

    if (adventure.candidates.find(candidate => candidate === characterName)) {
      throw new AppError(
        "Você já cadastrou um LOG, não é possível controlar dois logs simultâneos",
      );
    }

    if (adventure.playersLog) adventure.playersLog.push(logLink);
    else adventure.playersLog = [logLink];

    if (adventure.candidates) adventure.candidates.push(characterName);
    else adventure.candidates = [characterName];

    await this.adventuresRepository.save(adventure);

    return adventure;
  }
}
