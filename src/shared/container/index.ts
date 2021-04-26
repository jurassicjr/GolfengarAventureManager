import AdventuresRepository from "@modules/adventure/infra/typeorm/repositories/AdventuresRepository";
import IAdventureRepository from "@modules/adventure/repositories/IAdventuresRepository";
import { container } from "tsyringe";

container.registerSingleton<IAdventureRepository>(
  "AdventuresRepository",
  AdventuresRepository,
);
