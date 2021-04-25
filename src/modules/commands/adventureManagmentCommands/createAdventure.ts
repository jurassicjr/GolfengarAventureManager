import { Message } from "discord.js";

const createAdventure = {
  name: "registerCampaign",
  description: "Realize a campaign registration",
  execute: (msg: Message, args: string[]): void => {
    msg.reply("teste");
  },
};

export default createAdventure;
