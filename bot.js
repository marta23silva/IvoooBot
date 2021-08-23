require('dotenv').config();
const config = require('./config');

const discord = require('discord.js');
const client = new discord.Client();
client.manager = require('./src/manager/manager')(client);

const register = require('./src/utils/register');
register.registerEvents(client, '../../src/events');
register.registerCommands(client, '../../src/commands');

(async () => {
	await client.login(process.env.BOT_TOKEN);
})();

module.exports = { client }