import { Message } from "discord.js";
import createAdventure from "./adventureManagmentCommands/createAdventure";

const commands: {
  [key: string]: {
    name: string;
    description: string;
    commandString: string;
    execute: (msg: Message, args: string[]) => void;
  };
} = {};

commands[createAdventure.commandString] = createAdventure;

export default commands;
