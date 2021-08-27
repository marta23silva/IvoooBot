const { commands } = require('../utils/register');
const discord = require('discord.js');
const { guildCmdPrefixes } = require('./ready');

// var musicCommands = ['entra', 'play', 'pause', 'stop', 'skip', 'sai', 'queue']; 	// thinking about adding search command

module.exports = {
	run: message => {
		console.log(message.author.username + ' said: ' + message.content);

		const prefix = guildCmdPrefixes.get(message.guild.id);
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

		// User has to be in a voice channel to use the music commands
		// if(!message.member.voice.channel && musicCommands.includes(command)) return message.channel.send("tás a ser um bocado burro, entra lá no voice chat primeiro...");
		loadedCommand(tokens, message);
	},

	eventName: 'message'
}