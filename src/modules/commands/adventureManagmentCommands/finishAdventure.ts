import FinishAdventureService from "@modules/adventure/services/FinishAdventureService";

import AppError from "@shared/errors/AppError";
import { format } from "date-fns";
import { Collection, Message, User } from "discord.js";
import { container } from "tsyringe";

const finishAdventure = {
  name: "finish an adventure",
  description: "this method allow a dungeon master to finish a mission",
  commandString: "!finalizar",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length < 4) {
      await msg.channel.send(
        "Para finalizar a sessão todas as informações devem ser inseridas na seguinte ordem:" +
          "id, data da finalização, recompensas em gold, número de aventuras, descrição e os participantes\n" +
          "caso a missão que deseja finalizar esteja no mesmo canal o id da aventura pode ser ignorado",
      );
      return;
    }

    let adventureIdentification: string | undefined;
    let requester: string;
    let sessionEndDate: string;
    let goldReward: string;
    let xpReward: string;
    let report: string;
    let players: Collection<string, User>;

    const channelID = msg.channel.id;
    if (args.length === 4) {
      [
        adventureIdentification,
        sessionEndDate,
        goldReward,
        xpReward,
        report,
      ] = args;
      requester = msg.author.id;
      players = msg.mentions.users;
    } else {
      [sessionEndDate, goldReward, xpReward, report] = args;
      requester = msg.author.id;
      players = msg.mentions.users;
    }

    const finish = container.resolve(FinishAdventureService);
    try {
      const adventure = await finish.execute({
        adventureIdentification,
        report,
        goldReward,
        participants: players,
        requester,
        sessionEndDate,
        xpReward,
        channelID,
      });

      const header =
        "------------------------------------------------ MISSÃO ENCERRADA ------------------------------------------------";
      const adventureName = `Nome da aventura: ${adventure.name} / ${adventure.id}`;
      const adventureStartDate = `Data da sessão: ${format(
        adventure.sessionStartDate,
        "dd/MM/yyyy HH:mm",
      )}`;
      const adventureEndDate = `Data de termino da sessão: ${
        adventure.sessionEndDate
          ? format(adventure.sessionEndDate, "dd/MM/yyyy HH:mm")
          : ""
      }`;
      const description = `Acontecimentos: ${adventure.report}`;
      const numberOfVacancies = `Nº de vagas: ${adventure.numberOfVacancies}`;
      const participants = `Participantes: ${
        adventure.participants
          ? adventure.participants.map(participant => `<@${participant}> `)
          : ""
      }`;
      const rank = `Rank: <@&${adventure.rank}>`;
      const goldRewardMessage = `Recompensa em ouro: ${
        adventure.goldReward ? adventure.goldReward : ""
      }`;
      const XPRewardMessage = `Número de aventuras: ${
        adventure.XPReward ? adventure.XPReward : ""
      }`;
      const footer =
        "------------------------------------------------------------------------------------------------------------------";
      await msg.channel.send(
        `${header}\n${adventureName}\n${adventureStartDate}\n${adventureEndDate}\n${description}\n${numberOfVacancies}\n${participants}\n${rank}\n${goldRewardMessage}\n${XPRewardMessage}\n${footer}`,
      );

      await msg.delete();
    } catch (error) {
      if (error instanceof AppError) {
        await msg.channel.send(error.message);
      }
    }
  },
};

export default finishAdventure;
