import GetAdventuresService from "@modules/adventure/services/GetAdventuresService";
import AppError from "@shared/errors/AppError";
import { format } from "date-fns";
import { Message } from "discord.js";
import { container } from "tsyringe";

const listAdventures = {
  name: "listAdventures",
  description: "Realize a adventure registration",
  commandString: "!listar_aventuras",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length > 1) {
      msg.channel.send(
        "Apenas o rank da missão ou a marcação do mestre pode ser inserido como parametro",
      );
    }
    const rank = msg.mentions.roles.first();
    const dungeonMaster = msg.mentions.users.first();

    const getAdventures = container.resolve(GetAdventuresService);
    try {
      const adventures = await getAdventures.execute({ rank, dungeonMaster });
      const header =
        "--------------------------------------------------------AVENTURAS-----------------------------------------------------------";
      let adventuresMessage = "";
      adventures.forEach(adventure => {
        const adventureCitation = `<@${adventure.dungeonMaster}>`;

        adventuresMessage += `Nome da aventura: ${
          adventure.name
        }\nMestre: ${adventureCitation}\nData: ${format(
          adventure.sessionStartDate,
          "dd/MM/yyyy HH:mm",
        )}\nRank: <@&${
          adventure.rank
        }>\n------------------------------------\n`;
      });
      await msg.channel.send(
        `${header}\n\n${adventuresMessage}\n------------------------------------------------------------------------------------------------------------`,
      );
      await msg.delete();
    } catch (error) {
      if (error instanceof AppError) {
        await msg.channel.send(error.message);
      }
    }
  },
};

export default listAdventures;
