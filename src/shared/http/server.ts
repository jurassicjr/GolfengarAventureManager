import "dotenv/config";
import Discord from "discord.js";

const client = new Discord.Client();
client.commands = new Discord.Collection();
