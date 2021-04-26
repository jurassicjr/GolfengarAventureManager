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
        "Apenas o rank da missão pode ser inserido como parametro",
      );
    }
    const rank = msg.mentions.roles.first();

    const getAdventures = container.resolve(GetAdventuresService);
    try {
      const adventures = await getAdventures.execute(rank);
      const header =
        "------------------------------------------------------------------------------------------------------------\nNOME                                      | MESTRE                                  | DATA                       | RANK";
      let adventuresMessage = "";
      adventures.forEach(adventure => {
        const adventureCitation = `<@${adventure.dungeonMaster}>`;

        adventuresMessage += `${adventure.name
          .slice(0, 39)
          .padEnd(39)}| ${adventureCitation.slice(0, 31).padEnd(31)}| ${format(
          adventure.sessionStartDate,
          "dd/MM/yyyy HH:mm",
        )
          .slice(0, 18)
          .padEnd(18)}| <@&${adventure.rank}>\n`;
      });
      msg.channel.send(
        `LISTA DE MISSÔES\n${header}\n${adventuresMessage}\n------------------------------------------------------------------------------------------------------------`,
      );
      await msg.delete();
    } catch (error) {
      if (error instanceof AppError) {
        msg.channel.send(error.message);
      }
    }
  },
};

export default listAdventures;
