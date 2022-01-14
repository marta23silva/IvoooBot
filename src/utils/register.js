const path = require('path');
const fs = require('fs');

async function registerCommands(client, dir) {

	const filePath = path.join(__dirname, dir);
	const commandFiles = await fs.readdirSync(filePath);
	for(const file of commandFiles) {
		const stat = await fs.lstatSync(path.join(filePath, file));
		if(stat.isDirectory()) { registerCommands(client, path.join(dir, file)); }
		if(file.endsWith('.js')) {
			const loaded = require(path.join(filePath, file));

			if(!loaded.data || !loaded.execute) { return console.error(`Missing params from command: ${file}`); }
			
			client.commands.set(loaded.data.name, loaded);
			console.log(`Loaded command: ${loaded.data.name}`);
		}
	} 
}

async function registerEvents(client, dir) {
	const filePath = path.join(__dirname, dir);
	const eventFiles = await fs.readdirSync(filePath);
	for(const file of eventFiles) {
		const stat = await fs.lstatSync(path.join(filePath, file));
		if(stat.isDirectory()) { registerEvents(client, path.join(dir, file)); }
		if(file.endsWith('.js')) {
			const loaded = require(path.join(filePath, file));
			
			if(!loaded.data || !loaded.execute) { return console.error(`Missing params from event: ${file}`); }
			
			client.on(loaded.data.name, loaded.execute);
			console.log(`Loaded event: ${loaded.data.name}`);
		}
	}
}

module.exports = { registerCommands, registerEvents };