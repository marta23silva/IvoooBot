require('dotenv').config();
const config = require('./config');

const discord = require('discord.js');
const client = new discord.Client();
client.manager = require('./src/manager/manager')(client);

const fs = require('fs').promises;
const commands = new discord.Collection();
let connection;

(async () => {
	connection = await require('./database/db');
	await client.login(process.env.BOT_TOKEN);
})();

client.on('ready', readyMessage);

function readyMessage() {
	console.log('Hello! 🖤');
	client.manager.init(client.user.id);
	// OPTIONS: PLAYING, WATCHING, STREAMING, LISTENING
	client.user.setActivity('hyenas laughing', { type: 'LISTENING' });
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
				console.log('eventName: ' + loaded.eventName);
				console.log('run: ' + loaded.run);
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
			console.log(`Loaded text command: ${loaded.command}`);
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
			console.log(`Loaded music command: ${loaded.command}`);
		}
	});

fs.readdir('./src/commands/ivooo-voice')
	.then(files => {
		for(const file of files.filter(file => file.endsWith('.js'))) {
			const loaded = require('./src/commands/ivooo-voice/' + file);

			if(!loaded.command || !loaded.run) {
				return console.error(`Missing params from ${file}`);
			}

			commands.set(loaded.command, loaded.run);
			console.log(`Loaded ivooo-voice command: ${loaded.command}`);
		}
	});

module.exports = { 
	client, 
	commands
}