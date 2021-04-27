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
    if (args.length !== 5) {
      msg.channel.send(
        "Por favor insira a seguintes variaveis em ordem separado por espaço:" +
          "Nome da aventura, mestre(marcação), descrição, rank(marcação), data da sessão(MM-dd-yyyy HH:mm), número de vagas",
      );
      return;
    }

    const adventureName = args[0].toLowerCase();
    const dungeonMaster = msg.author;
    const description = args[1];

    const rank = msg.mentions.roles.first();
    const sessionStartDate = args[3];
    const numberOfVacancies = Number(args[4]);
    const channelID = msg.channel.id;

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
        channelID,
      });

      const header =
        "---------------------------------------------------AVENTURA CADASTRADA-------------------------------------------------------------";
      const adventureIDMessage = `Id: ${adventure.id}`;
      const adventureTitleMessage = `Título: ${adventure.name}`;
      const adventureDungeonMasterMessage = `Mestre: <@${adventure.dungeonMaster}>`;
      const adventureDescriptionMessage = `Descrição: ${adventure.description}`;
      const adventureRankMessage = `Rank: <@&${adventure.rank}>`;
      const adventureSessionData = `Data: ${format(
        adventure.sessionStartDate,
        "dd/MM/yyyy HH:mm",
      )}`;
      const footer =
        "-----------------------------------------------------------------------------------------------------------------------------------";

      msg.channel.send(
        `${header}\n${adventureIDMessage}\n${adventureTitleMessage}\n${adventureDungeonMasterMessage}\n${adventureDescriptionMessage}\n${adventureRankMessage}\n${adventureSessionData}\n${footer}`,
      );
    } catch (error) {
      if (error instanceof AppError) {
        msg.channel.send(error.message);
      }
    }
  },
};

export default createAdventure;
