import ICreateAdventureDTO from "@modules/adventure/dtos/ICreateAdventureDTO";
import IAdventuresRepository from "@modules/adventure/repositories/IAdventuresRepository";
import { getRepository, IsNull, Repository } from "typeorm";
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
    numberOfVacancies,
    channelID,
  }: ICreateAdventureDTO): Promise<Adventure> {
    const adventure = this.ormRepository.create({
      name: adventureName,
      description,
      dungeonMaster,
      rank,
      sessionStartDate,
      numberOfVacancies,
      channelID,
    });

    await this.save(adventure);

    return adventure;
  }

  public async save(adventure: Adventure): Promise<Adventure> {
    const saved = await this.ormRepository.save(adventure);

    return saved;
  }

  public async findByName(
    adventureName: string,
  ): Promise<Adventure | undefined> {
    const adventure = await this.ormRepository.findOne({
      where: { name: adventureName },
    });

    return adventure;
  }

  public async findAll(): Promise<Adventure[]> {
    const adventures = await this.ormRepository.find({
      where: { sessionEndDate: IsNull() },
      order: { sessionStartDate: "ASC" },
    });
    return adventures;
  }

  public async findByRank(rank: string): Promise<Adventure[]> {
    const adventures = await this.ormRepository.find({ where: { rank } });
    return adventures;
  }

  public async findByID(id: string): Promise<Adventure | undefined> {
    const adventure = await this.ormRepository.findOne(id);
    return adventure;
  }

  public async findByDungeonMaster(
    dungeonMaster: string,
  ): Promise<Adventure[]> {
    const adventures = await this.ormRepository.find({
      where: { dungeonMaster },
    });

    return adventures;
  }
}
