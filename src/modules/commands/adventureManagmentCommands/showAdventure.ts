import GetAdventureCompleteInformationService from "@modules/adventure/services/GetAdventureCompleteInformationService";
import AppError from "@shared/errors/AppError";
import { format } from "date-fns";
import { Message } from "discord.js";
import { container } from "tsyringe";
import { SimpleConsoleLogger } from "typeorm";

const showAdventure = {
  name: "showAdventure",
  description: "Show all the informations about an specific adventure",
  commandString: "!mostrar_aventura",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length > 1) {
      msg.channel.send(
        "Apenas o rank da missão pode ser inserido como parametro",
      );
    }
    const adventureIdentification = args[0];

    const getAdventureInformation = container.resolve(
      GetAdventureCompleteInformationService,
    );
    try {
      const adventure = await getAdventureInformation.execute(
        adventureIdentification,
      );

      if (!adventure) {
        msg.channel.send(
          "Desculpa mas não foi possível encontrar um aventura com o ID ou Nome informado",
        );
        return;
      }
      const header =
        "------------------------------------------------ MISSÂO ------------------------------------------------";
      const adventureName = `Nome da aventura: ${adventure}`;
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
          ? adventure.participants.map(participant => `<@${participant}>, `)
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

      msg.channel.send(
        `${header}\n${adventureName}\n${adventureStartDate}\n${adventureEndDate}\n${description}\n${numberOfVacancies}\n${participants}\n${rank}\n${report}\n${goldReward}\n${XPReward}`,
      );
    } catch (error) {
      console.log(error);
      if (error instanceof AppError) {
        msg.channel.send(error.message);
      }
    }
  },
};

export default showAdventure;
