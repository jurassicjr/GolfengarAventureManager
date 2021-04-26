import CreateNewAdventureService from "@modules/adventure/services/CreateNewAdventureService";
import AppError from "@shared/errors/AppError";
import { format } from "date-fns";
import { Message } from "discord.js";
import { container } from "tsyringe";

const createAdventure = {
  name: "registerAdventure",
  description: "Realize a adventure registration",
  commandString: "!cadastrar_aventura",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length !== 6) {
      msg.channel.send(
        "Por favor insira a seguintes variaveis em ordem separado por espaço:" +
          "Nome da aventura, mestre(marcação), descrição, rank(marcação), data da sessão(MM-dd-yyyy HH:mm), número de vagas",
      );
      return;
    }
    const adventureName = args[0];
    const dungeonMaster = msg.mentions.users.first();
    const description = args[2];
    const rank = msg.mentions.roles.first();
    const sessionStartDate = args[4];
    const numberOfVacancies = Number(args[5]);

    // if (rank && !msg.member?.roles.cache.has("550849479025360900")) {
    //   msg.channel.send("Você não tem cargo de <@&550849479025360900>");
    //   return;
    // }

    const createNewAdventure = container.resolve(CreateNewAdventureService);
    try {
      const adventure = await createNewAdventure.execute({
        adventureName,
        sessionStartDate,
        description,
        dungeonMaster,
        rank,
        numberOfVacancies,
      });

      msg.channel.send(
        `-----------------------------------------------------------------------\n
      ID: ${adventure.id}\n
      Título: ${adventure.name}\n
      Mestre: <@${adventure.dungeonMaster}>\n
      Descrição: ${adventure.description}\n
      Rank: <@&${adventure.rank}>\n
      Data: ${format(adventure.sessionStartDate, "dd/MM/yyyy HH:mm")}\n
      ------------------------------------------------------------------------`,
      );
    } catch (error) {
      if (error instanceof AppError) {
        msg.channel.send(error.message);
      }
    }
  },
};

export default createAdventure;
