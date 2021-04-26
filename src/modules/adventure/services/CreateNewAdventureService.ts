import AppError from "@shared/errors/AppError";
import { parseISO } from "date-fns";
import { Role, User } from "discord.js";
import { inject, injectable } from "tsyringe";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventuresRepository from "../repositories/IAdventuresRepository";

interface IRequest {
  adventureName: string;
  dungeonMaster: User | undefined;
  description: string;
  rank: Role | undefined;
  sessionStartDate: string;
  numberOfVacancies: number;
}

@injectable()
export default class CreateNewAdventureService {
  constructor(
    @inject("AdventuresRepository")
    private adventuresRepository: IAdventuresRepository,
  ) {}

  public async execute({
    adventureName,
    dungeonMaster,
    description,
    rank,
    sessionStartDate,
    numberOfVacancies,
  }: IRequest): Promise<Adventure> {
    if (!rank || !dungeonMaster)
      throw new AppError("Rank ou Mestre não informado");

    const hasAdventureWithSameName = await this.adventuresRepository.findByName(
      adventureName,
    );

    if (hasAdventureWithSameName) {
      throw new AppError(
        "Uma missão com esse nome já foi registrada anteriormente",
      );
    }

    const adventure = await this.adventuresRepository.create({
      adventureName,
      description,
      dungeonMaster: dungeonMaster.id,
      rank: rank.id,
      sessionStartDate: parseISO(sessionStartDate.replace(/"+/g, "").trim()),
      numberOfVacancies,
    });

    return adventure;
  }
}
