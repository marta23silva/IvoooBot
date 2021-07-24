require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
client.login(process.env.TOKEN);

client.on('ready', readyMessage);

function readyMessage() {
	console.log('GHEGAAAAAY 🖤😍🥵💞');
	
	// const logChannel = client.channels.cache.get(process.env.CHANNEL_ID);
	// logChannel.send('GHEGAAAAAY 🖤😍🥵💞');
}

const commandHandler = require("./commands");
client.on('message', commandHandler);