import { Message } from "discord.js";
import createAdventure from "./adventureManagmentCommands/createAdventure";

const commands: {
  [key: string]: {
    name: string;
    description: string;
    execute: (msg: Message, args: string[]) => void;
  };
} = {};

commands[createAdventure.name] = createAdventure;

export default commands;
