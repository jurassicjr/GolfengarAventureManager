import FinishAdventureService from "@modules/adventure/services/FinishAdventureService";

import AppError from "@shared/errors/AppError";
import { format } from "date-fns";
import { Message } from "discord.js";
import { container } from "tsyringe";

const finishAdventure = {
  name: "finish an adventure",
  description: "this method allow a dungeon master to finish a mission",
  commandString: "!finalizar",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length < 5) {
      await msg.channel.send(
        "Para finalizar a sessão todas as informações devem ser inseridas na seguinte ordem: id, data da finalização, recompensas em gold, número de aventuras, descrição e os participantes",
      );
      return;
    }
    const adventureIdentification = args[0];
    const requester = msg.author.id;
    const sessionEndDate = args[1];
    const goldReward = args[2];
    const xpReward = args[3];
    const report = args[4];
    const players = msg.mentions.users;

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
