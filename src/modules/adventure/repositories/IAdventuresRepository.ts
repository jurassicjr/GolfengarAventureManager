import ICreateAdventureDTO from "../dtos/ICreateAdventureDTO";
import Adventure from "../infra/typeorm/entities/adventure";

export default interface IAdventureRepository {
  create(data: ICreateAdventureDTO): Promise<Adventure>;
  save(adventure: Adventure): Promise<Adventure>;
}
