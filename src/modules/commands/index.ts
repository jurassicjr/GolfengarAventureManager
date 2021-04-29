import { Message } from "discord.js";
import { createBinary } from "typescript";
import createAdventure from "./adventureManagmentCommands/createAdventure";
import finishAdventure from "./adventureManagmentCommands/finishAdventure";
import helpCommand from "./adventureManagmentCommands/helpCommand";
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
commands["!criar_aventura"] = createAdventure;
commands[listAdventures.commandString] = listAdventures;
commands[showAdventure.commandString] = showAdventure;
commands[subscribeToAdventure.commandString] = subscribeToAdventure;
commands[finishAdventure.commandString] = finishAdventure;
commands[helpCommand.commandString] = helpCommand;

export default commands;
