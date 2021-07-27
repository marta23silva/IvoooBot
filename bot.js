require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
let connection;

client.on('ready', readyMessage);

function readyMessage() {
	console.log('Hello! 🖤');
}

client.on('guildCreate', async (guild) => {
	try {
		await connection.query(
			`INSERT INTO Server VALUES('${guild.id}', '${guild.ownerID}')`
		);
	} catch(err) {
		console.log(err);
	}
});

(async () => {
	connection = await require('./database/db');
	await client.login(process.env.BOT_TOKEN);
})();

const commandHandler = require("./commands");
client.on('message', commandHandler);