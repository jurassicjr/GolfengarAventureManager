import AppError from "@shared/errors/AppError";
import { isBefore, parseISO } from "date-fns";
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

    const sessionDate = parseISO(sessionStartDate.replace(/"+/g, "").trim());

    if (isBefore(sessionDate, new Date())) {
      throw new AppError(
        "Não é possível cadastrar uma missão com uma data de sessão anterior ao dia de hoje",
      );
    }

    const adventure = await this.adventuresRepository.create({
      adventureName,
      description,
      dungeonMaster: dungeonMaster.id,
      rank: rank.id,
      sessionStartDate: sessionDate,
      numberOfVacancies,
    });

    return adventure;
  }
}
