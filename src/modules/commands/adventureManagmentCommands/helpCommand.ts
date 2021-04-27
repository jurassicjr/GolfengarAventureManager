import { Message } from "discord.js";

const listAdventures = {
  name: "Help",
  description: "This commands show to the user how he can use the bot",
  commandString: "!ajuda",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    msg.author.send(
      `
      Olá como vai você? estou aqui para te ajudar a compreender como funciona o Gerente de aventuras!.
      Segue os comandos:
      !criar_aventura
      `,
    );
  },
};

export default listAdventures;
