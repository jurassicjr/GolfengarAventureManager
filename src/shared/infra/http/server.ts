import "reflect-metadata";
import "dotenv/config";
import "@shared/infra/typeorm";
import "@shared/container";
import Discord from "discord.js";
import botCommands from "../../../modules/commands/index";

const client = new Discord.Client();

client.commands = new Discord.Collection();

Object.keys(botCommands).map(key =>
  client.commands.set(botCommands[key].commandString, botCommands[key]),
);

const { TOKEN } = process.env;

client.login(TOKEN);

client.on("ready", () => {
  console.info(`Logged in as ${client.user?.tag}!`);
});

client.on("message", msg => {
  const args = msg.content.split(/ +(?=(?:[^"]*"[^"]*")*[^"]*$)/);
  const command = args.shift()?.toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(msg, args);
  } catch (error) {
    console.error(error);
    msg.reply("there was an error trying to execute that command!");
  }
});
