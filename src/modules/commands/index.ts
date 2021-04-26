import { Message } from "discord.js";
import createAdventure from "./adventureManagmentCommands/createAdventure";
import listAdventures from "./adventureManagmentCommands/listAdventures";
import showAdventure from "./adventureManagmentCommands/showAdventure";
import subscribeToAdventure from "./adventureManagmentCommands/subscribToMission";

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
commands[showAdventure.commandString] = showAdventure;
commands[subscribeToAdventure.commandString] = subscribeToAdventure;

export default commands;
