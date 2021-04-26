import { Message } from "discord.js";
import createAdventure from "./adventureManagmentCommands/createAdventure";
import listAdventures from "./adventureManagmentCommands/listAdventures";

const commands: {
  [key: string]: {
    name: string;
    description: string;
    commandString: string;
    execute: (msg: Message, args: string[]) => void;
  };
} = {};

commands[createAdventure.commandString] = createAdventure;
commands[listAdventures.commandString] = listAdventures;

export default commands;
