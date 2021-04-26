import SubscribeToAdventureService from "@modules/adventure/services/SubscribeToAdventureService";
import AppError from "@shared/errors/AppError";
import { format } from "date-fns";
import { Message } from "discord.js";
import { container } from "tsyringe";

const subscribeToAdventure = {
  name: "subscribe to adventure",
  description: "this method allow a user to subscrib in an adventure",
  commandString: "!inscrever",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length !== 3) {
      msg.channel.send(
        "Por favor insira todos os atributos nas seguinte ordem: nome ou ID da aventura, nome_do_personagem, link do log",
      );
    }
    const adventureIdentification = args[0];
    const characterName = args[1];
    const logLink = args[2].replace(/"+/, "");

    const subscribe = container.resolve(SubscribeToAdventureService);
    try {
      const adventure = await subscribe.execute({
        adventureIdentification,
        characterName,
        logLink,
      });

      const header =
        "------------------------------------------------ INSCRIÇÂO REALIZADA ------------------------------------------------";
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
      const description = `Descrição: ${adventure.description}`;
      const numberOfVacancies = `Nº de vagas: ${adventure.numberOfVacancies}`;
      const participants = `Participantes: ${
        adventure.participants
          ? adventure.participants.map(participant => `<@${participant}> `)
          : ""
      }`;
      const rank = `Rank: <@&${adventure.rank}>`;
      const report = `Relatório: ${adventure.report ? adventure.report : ""}`;
      const goldReward = `Recompensa em ouro: ${
        adventure.goldReward ? adventure.goldReward : ""
      }`;
      const XPReward = `Número de aventuras: ${
        adventure.XPReward ? adventure.XPReward : ""
      }`;

      const footer =
        "-----------------------------------------------------------------------------------------------------------------------------";
      msg.channel.send(
        `${header}\n${adventureName}\n${adventureStartDate}\n${adventureEndDate}\n${description}\n${numberOfVacancies}\n${participants}\n${rank}\n${report}\n${goldReward}\n${XPReward}\n${footer}`,
      );

      msg.delete();
    } catch (error) {
      if (error instanceof AppError) {
        msg.channel.send(error.message);
      }
    }
  },
};

export default subscribeToAdventure;
