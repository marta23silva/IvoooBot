require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
const db = require('./database/db');
client.login(process.env.BOT_TOKEN);

client.on('ready', readyMessage);

function readyMessage() {
	console.log('Hello! 🖤');
}

const commandHandler = require("./commands");
client.on('message', commandHandler);