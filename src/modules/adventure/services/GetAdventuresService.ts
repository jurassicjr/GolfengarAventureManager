import { Role } from "discord.js";
import { inject, injectable } from "tsyringe";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventureRepository from "../repositories/IAdventuresRepository";

@injectable()
export default class GetAdventuresService {
  constructor(
    @inject("AdventuresRepository")
    private adventuresRepository: IAdventureRepository,
  ) {}

  public async execute(rank: Role | undefined): Promise<Adventure[]> {
    if (rank === undefined) {
      const adventures = await this.adventuresRepository.findAll();
      return adventures;
    }
    const adventures = await this.adventuresRepository.findByRank(rank.id);
    return adventures;
  }
}
