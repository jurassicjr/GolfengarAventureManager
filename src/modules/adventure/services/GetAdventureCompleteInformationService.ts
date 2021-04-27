import { inject, injectable } from "tsyringe";
import { isUuid } from "uuidv4";
import Adventure from "../infra/typeorm/entities/adventure";
import IAdventureRepository from "../repositories/IAdventuresRepository";

@injectable()
export default class GetAdventureCompleteInformationService {
  constructor(
    @inject("AdventuresRepository")
    private adventuresRepository: IAdventureRepository,
  ) {}

  public async execute(
    adventureIdentification: string,
  ): Promise<Adventure | undefined> {
    let adventure: Adventure | undefined;
    if (isUuid(adventureIdentification)) {
      adventure = await this.adventuresRepository.findByID(
        adventureIdentification,
      );
    } else {
      adventure = await this.adventuresRepository.findByName(
        adventureIdentification.toLocaleLowerCase(),
      );
    }
    return adventure;
  }
}
