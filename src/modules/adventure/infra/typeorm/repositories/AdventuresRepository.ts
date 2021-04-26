import ICreateAdventureDTO from "@modules/adventure/dtos/ICreateAdventureDTO";
import IAdventuresRepository from "@modules/adventure/repositories/IAdventuresRepository";
import { getRepository, Repository } from "typeorm";
import Adventure from "../entities/adventure";

export default class AdventuresRepository implements IAdventuresRepository {
  private ormRepository: Repository<Adventure>;

  constructor() {
    this.ormRepository = getRepository(Adventure);
  }

  public async create({
    adventureName,
    description,
    dungeonMaster,
    rank,
    sessionStartDate,
  }: ICreateAdventureDTO): Promise<Adventure> {
    const adventure = this.ormRepository.create({
      name: adventureName,
      description,
      dungeonMaster,
      rank,
      sessionStartDate,
    });

    await this.save(adventure);

    return adventure;
  }

  public async save(adventure: Adventure): Promise<Adventure> {
    const saved = await this.ormRepository.save(adventure);

    return saved;
  }
}
