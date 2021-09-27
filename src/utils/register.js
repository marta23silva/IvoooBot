const path = require('path');
const fs = require('fs').promises;
const discord = require('discord.js');

const commands = new discord.Collection();
const cmdList = new discord.Collection();

async function registerEvents(client, dir) {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for(const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if(stat.isDirectory()) registerEvents(client, path.join(dir, file));
		if(file.endsWith('.js')) {
			const loaded = require(path.join(filePath, file));

			if(!loaded.eventName || !loaded.run) { return console.error(`Missing params from ${file}`); }
			
			client.on(loaded.eventName, loaded.run);
			console.log(`Loaded event: ${loaded.eventName}`);
		}
	}
}

async function registerCommands(client, dir) {
	const filePath = path.join(__dirname, dir);
	const files = await fs.readdir(filePath);
	for(const file of files) {
		const stat = await fs.lstat(path.join(filePath, file));
		if(stat.isDirectory()) registerCommands(client, path.join(dir, file));
		if(file.endsWith('.js')) {
			const loaded = require(path.join(filePath, file));

			if(!loaded.command || !loaded.run) { return console.error(`Missing params from ${file}`); }

			const { aliases } = loaded.command;
			
			cmdList.set(loaded.command.name, loaded.command);
			commands.set(loaded.command.name, loaded.run);
			console.log(`Loaded command: ${loaded.command.name}`);

			if(aliases.length !== 0) aliases.forEach(alias => commands.set(alias, loaded.run));
			if(aliases.length !== 0) aliases.forEach(alias => cmdList.set(alias, loaded.command));
		}
	}
}

module.exports = {
	registerEvents,
	registerCommands,
	commands,
	cmdList
}