import { Role, User } from "discord.js";
import { inject, injectable } from "tsyringe";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventureRepository from "../repositories/IAdventuresRepository";

interface IRequest {
  rank: Role | undefined;
  dungeonMaster: User | undefined;
}

@injectable()
export default class GetAdventuresService {
  constructor(
    @inject("AdventuresRepository")
    private adventuresRepository: IAdventureRepository,
  ) {}

  public async execute({
    rank,
    dungeonMaster,
  }: IRequest): Promise<Adventure[]> {
    if (!rank && !dungeonMaster) {
      const adventures = await this.adventuresRepository.findAllActive();
      return adventures;
    }
    if (rank) {
      const adventures = await this.adventuresRepository.findByRank(rank.id);
      return adventures;
    }
    if (dungeonMaster) {
      const adventures = await this.adventuresRepository.findByDungeonMaster(
        dungeonMaster.id,
      );
      return adventures;
    }

    return [];
  }
}
