import "reflect-metadata";
import "dotenv/config";
import Discord from "discord.js";
import botCommands from "../../modules/commands/index";

const client = new Discord.Client();

client.commands = new Discord.Collection();

Object.keys(botCommands).map(key =>
  client.commands.set(botCommands[key].name, botCommands[key]),
);

const { TOKEN } = process.env;

client.login(TOKEN);

client.on("ready", () => {
  console.info(`Logged in as ${client.user?.tag}!`);
});

client.on("message", msg => {
  if (msg.content === "ping") {
    msg.reply("pong");
    msg.channel.send("pong");
  }
});
