import { Message } from "discord.js";

const help = {
  name: "help",
  description: "Show all commands related to adventure",
  commandString: "!help",
  execute: async (msg: Message, args: string[]): Promise<void> => {
    if (args.length > 1) {
      msg.channel.send(
        "Apenas o rank da missão pode ser inserido como parametro",
      );
    }
  },
};

export default help;
