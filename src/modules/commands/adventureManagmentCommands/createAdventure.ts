import CreateNewAdventureService from "@modules/adventure/services/CreateNewAdventureService";
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
          "Nome da aventura, mestre(marcação), descrição, rank(marcação), data da sessão(MM-dd-yyyy HH:mm)",
      );
    }
    const adventureName = args[0];
    const dungeonMaster = msg.mentions.users.first();
    const description = args[2];
    const rank = msg.mentions.roles.first();
    const sessionStartDate = args[4];

    // if (rank && !msg.member?.roles.cache.has("550849479025360900")) {
    //   msg.channel.send("Você não tem cargo de <@&550849479025360900>");
    //   return;
    // }

    const createNewAdventure = container.resolve(CreateNewAdventureService);

    const adventure = await createNewAdventure.execute({
      adventureName,
      sessionStartDate,
      description,
      dungeonMaster,
      rank,
    });

    if (undefined === adventure) {
      msg.channel.send(
        "Algo deu errado por favor confira todas as informações enviadas",
      );
      return;
    }

    msg.channel.send(
      `-----------------------------------------------------------------------\n
      ID: ${adventure.id}\n
      Título: ${adventure.name}\n
      Mestre: <@${adventure.dungeonMaster}\n
      Descrição: ${adventure.description}\n
      Rank: <@${adventure.rank}>\n
      Data: ${format(adventure.sessionStartDate, "dd/MM/yyyy HH:mm")}\n
      ------------------------------------------------------------------------`,
    );
  },
};

export default createAdventure;
