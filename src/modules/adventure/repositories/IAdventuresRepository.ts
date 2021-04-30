import ICreateAdventureDTO from "../dtos/ICreateAdventureDTO";
import Adventure from "../infra/typeorm/entities/adventure";

export default interface IAdventureRepository {
  create(data: ICreateAdventureDTO): Promise<Adventure>;
  save(adventure: Adventure): Promise<Adventure>;
  findByName(adventureName: string): Promise<Adventure | undefined>;
  findAllActive(): Promise<Adventure[]>;
  findByRank(rank: string): Promise<Adventure[]>;
  findByID(id: string): Promise<Adventure | undefined>;
  findByDungeonMaster(dungeonMaster: string): Promise<Adventure[]>;
  findByChannelID(channelID: string): Promise<Adventure | undefined>;
}
