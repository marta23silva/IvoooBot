const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const dotenv = require("dotenv").config();

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
// Do not read hidden files, if any
const directories = fs.readdirSync('./src/commands').filter((file) => !(/(^|\/)\.[^\/\.]/g).test(file));

for(const directory of directories) {
    const files = fs.readdirSync(`./src/commands/${directory}`).filter((file) => file.endsWith('.js'));

    for(const file of files) {
        const command = require(`./src/commands/${directory}/${file}`);
        commands.push(command.data.toJSON());
        console.log(`Deployed command: ${command.data.name}`);
    }
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);