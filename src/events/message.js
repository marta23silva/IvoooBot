const { commands } = require('../utils/register');
const discord = require('discord.js');
const { guildCmdPrefixes } = require('./ready');

module.exports = {
	run: message => {

		console.log(message.author.username + ' said: ' + message.content);

		let prefix = guildCmdPrefixes.get(message.guild.id);
		if(!prefix) prefix = 'ivooo';
		// Ignore if a message comes from a bot
		if(message.author.bot) return;
		// Ignore if it is not a message for Ivooo
		if(!message.content.toLowerCase().startsWith(prefix)) return;

		const tokens = message.content.slice(prefix.length).trim().split(/ +/g);

		let command = tokens.shift().toLowerCase();
		// No more commands other than "ivooo" should go to IvoooTalk
		if(!command) { command = "ivooo"; }

		const loadedCommand = commands.get(command);
		// Ignore if the command does not exist
		if(!loadedCommand) return;

		loadedCommand(tokens, message);
	},

	eventName: 'message'
}