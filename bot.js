const { Client, Intents, Collection } = require('discord.js');
const dotenv = require('dotenv').config();
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
client.commands = new Collection();
client.aliases = new Collection();
client.manager = require('./src/utils/manager')(client);

client.once("ready", () => { 
	console.log('Hello! 🖤');
	client.manager.init(client.user.id);
});

client.on("raw", d => client.manager.updateVoiceState(d));

const register = require('./src/utils/register');
register.registerCommands(client, '../commands');
register.registerEvents(client, '../events');

client.login(process.env.BOT_TOKEN);