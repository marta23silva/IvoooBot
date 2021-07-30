const { commands } = require('../../bot');		// commands variable from bot.js
const config = require('../../config.js');
const discord = require('discord.js');

module.exports = {
	run: message => {
		console.log(message.author.username + ' said: ' + message.content);

		const lowerCaseMessage = message.content.toLowerCase();
		// Ignore if it is not a message for the bot
		if(!lowerCaseMessage.startsWith(config.prefix)) return;
		// Ignore if a message comes from a bot
		if(message.author.bot) return;

		const tokens = lowerCaseMessage.slice(config.prefix.length).trim().split(/ +/g);
		
		let command = tokens.shift();
		// No more commands other than "ivooo" should go to IvoooTalk
		if(!command) { command = "ivooo"; }

		const loadedCommand = commands.get(command);
		// Ignore if the command does not exist
		if(!loadedCommand) return;

		// User has to be in a voice channel to use the music commands
		// !!! THIS IF STATEMENT STILL NEEDS TO BE CHANGED !!!
		if(!message.member.voice.channel && command == 'play') return message.channel.send("tás a ser um bocado burro, entra lá no voice chat primeiro...");

		loadedCommand(tokens, message);
	},

	eventName: 'message'
}