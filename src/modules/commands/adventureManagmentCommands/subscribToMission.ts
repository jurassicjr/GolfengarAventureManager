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
    if (args.length > 2 || args.length < 1) {
      await msg.channel.send(
        "Por favor insira todos os atributos nas seguinte ordem: **[nome ou ID da aventura] [link do log]**\nOu caso esteja no canal da aventura desejada insira apenas o link do log",
      );
      return;
    }

    let adventureIdentification: string | undefined;
    let characterName: string;
    let logLink: string;
    let channelID: string;

    if (args.length === 1) {
      adventureIdentification = undefined;
      characterName = msg.author.id;
      [logLink] = args;
      channelID = msg.channel.id;
    } else {
      [adventureIdentification, logLink] = args;
      characterName = msg.author.id;
      channelID = msg.channel.id;
    }

    const subscribe = container.resolve(SubscribeToAdventureService);
    try {
      const adventure = await subscribe.execute({
        adventureIdentification,
        characterName,
        logLink,
        channelID,
      });

      const header =
        "------------------------------------------------ INSCRIÇÂO REALIZADA ------------------------------------------------";
      const adventureName = `Nome da aventura: ${adventure.name} / ${adventure.id}`;
      const adventureStartDate = `Data da sessão: ${format(
        adventure.sessionStartDate,
        "dd/MM/yyyy HH:mm",
      )}`;
      const description = `Descrição: ${adventure.description}`;
      const numberOfVacancies = `Nº de vagas: ${adventure.numberOfVacancies}`;
      const participants = `Candidatos: ${
        adventure.candidates
          ? adventure.candidates.map(candidate => `<@${candidate}> `)
          : ""
      }`;
      const logs = `Logs: \n${
        adventure.playersLog ? adventure.playersLog.map(log => `${log}\n`) : ""
      }`;
      const rank = `Rank: <@&${adventure.rank}>`;

      const footer =
        "-----------------------------------------------------------------------------------------------------------------------------";
      await msg.channel.send(
        `${header}\n${adventureName}\n${adventureStartDate}\n${description}\n${numberOfVacancies}\n${participants}\n${logs}\n${rank}\n${footer}`,
      );

      await msg.delete();
    } catch (error) {
      if (error instanceof AppError) {
        await msg.channel.send(error.message);
      }
    }
  },
};

export default subscribeToAdventure;
