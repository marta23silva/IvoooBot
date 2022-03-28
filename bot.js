const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv").config();
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();

client.once("ready", () => { console.log('Hello! 🖤'); });

const register = require('./src/utils/register');
register.registerCommands(client, '../commands');
register.registerEvents(client, '../events');

client.login(process.env.BOT_TOKEN);