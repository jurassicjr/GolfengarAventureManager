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
    if (args.length !== 2) {
      msg.channel.send(
        "Por favor insira todos os atributos nas seguinte ordem: ID da aventura, link do log",
      );
    }
    const adventureIdentification = args[0];
    const characterName = msg.author.id;
    const logLink = args[1];

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
      const participants = `Candidatos: ${
        adventure.candidates
          ? adventure.candidates.map(candidate => `<@${candidate}> `)
          : ""
      }`;
      const rank = `Rank: <@&${adventure.rank}>`;

      const footer =
        "-----------------------------------------------------------------------------------------------------------------------------";
      msg.channel.send(
        `${header}\n${adventureName}\n${adventureStartDate}\n${adventureEndDate}\n${description}\n${numberOfVacancies}\n${participants}\n${rank}\n${footer}`,
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
