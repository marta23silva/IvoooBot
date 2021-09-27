const { client } = require('../../../bot');
const { MessageEmbed } = require('discord.js');
const { getPrefix } = require('../../utils/tokenAdjuster');
const { verifyChannel } = require('../../utils/musicVerify');

module.exports = {
	command: {
		name: 'skipto',
		category: 'Music',
		description: 'Skips to the specified song.',
		aliases: ['st'],
		usage: 'skipto [#]'
	},

	run: (tokens, message) => {

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('Skip to where?! 🤨');
		if(verifyChannel(message, player)) return;

		const prefix = getPrefix(message);
		if(tokens.length != 1) return message.channel.send(new MessageEmbed().setDescription(`❗️**Incorrect amount of arguments.**\nPlease use \`${prefix}skipto [#]\` to play the song that you want.`).setColor('00ff00'));
		if(isNaN(tokens[0])) return message.channel.send(new MessageEmbed().setDescription(`❗️**Incorrect use of the command.**\nPlease use \`${prefix}skipto [NUMBER]\` to play the song you want.`).setColor('00ff00'));
		if(tokens[0] < 1) return message.channel.send(new MessageEmbed().setDescription(`❌ **I cannot skip to a song that I'm already playing.**`).setColor('00ff00'));
		if(tokens[0] > player.queue.size) return message.channel.send(new MessageEmbed().setDescription(`🧐 Song not found.`).setColor('00ff00'));

		const { title } = player.queue[tokens[0]-1];
		// remove the songs from the queue
		for(var i = 1; i < tokens[0]; i++) { player.queue.splice(tokens[i]-1, 1); }

		// stop current song	
		player.stop();
		message.channel.send(
			new MessageEmbed()
			.setDescription(`✅ Skipped to ${title}!`)
			.setColor('00ff00')
		);
	}
}