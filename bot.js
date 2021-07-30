require('dotenv').config();
const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.js');
const lavalink = require('@lavacord/discord.js');
const fs = require('fs').promises;
let connection;

const lavacordManager = new lavalink.Manager(client, config.nodes);

lavacordManager.on('error', (err, node) => {
	console.error(`An error has occurred on node ${node.id}.`, err)
});

const commands = new discord.Collection();

client.on('ready', readyMessage);

function readyMessage() {
	console.log('Hello! 🖤');
}

client.on('guildCreate', async (guild) => {
	try {
		console.log(connection);
		await connection.query(
			`INSERT INTO Server VALUES('${guild.id}', '${guild.ownerID}')`
		);
	} catch(err) {
		console.error(`Error inserting server into database:`, err);
	}
});

fs.readdir('./src/events')
	.then(files => {
		for(const file of files.filter(file => file.endsWith('.js'))) {
			const loaded = require('./src/events/' + file);

			if(!loaded.eventName || !loaded.run) {
				return console.error(`Missing params from ${file}`);
			}

			client.on(loaded.eventName, loaded.run);
			console.log(`Loaded event: ${loaded.eventName}`);
		}
	});

fs.readdir('./src/commands/text')
	.then(files => {
		for(const file of files.filter(file => file.endsWith('.js'))) {
			const loaded = require('./src/commands/text/' + file);

			if(!loaded.command || !loaded.run) {
				return console.error(`Missing params from ${file}`);
			}

			commands.set(loaded.command, loaded.run);
			console.log(`Loaded command: ${loaded.command}`);
		}
	});

fs.readdir('./src/commands/music')
	.then(files => {
		for(const file of files.filter(file => file.endsWith('.js'))) {
			const loaded = require('./src/commands/music/' + file);

			if(!loaded.command || !loaded.run) {
				return console.error(`Missing params from ${file}`);
			}

			commands.set(loaded.command, loaded.run);
			console.log(`Loaded event: ${loaded.command}`);
		}
	});

(async () => {
	connection = await require('./database/db');
	await client.login(process.env.BOT_TOKEN);
})();

module.exports = { 
	client, 
	commands,

	// music
	lavacordManager,
	queues: {}
}