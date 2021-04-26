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
  }: IRequest): Promise<Adventure | undefined> {
    if (!rank || !dungeonMaster) return undefined;

    const adventure = await this.adventuresRepository.create({
      adventureName,
      description,
      dungeonMaster: dungeonMaster.id,
      rank: rank.id,
      sessionStartDate: parseISO(sessionStartDate.replace(/"+/g, "").trim()),
    });

    return adventure;
  }
}
