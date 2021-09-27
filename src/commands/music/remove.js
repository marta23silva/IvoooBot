const { client } = require('../../../bot');
const { MessageEmbed } = require('discord.js');
const { getPrefix } = require('../../utils/tokenAdjuster');
const { verifyChannel } = require('../../utils/musicVerify');

module.exports = {
	command: {
		name: 'remove',
		category: 'Music',
		description: 'Removes the specified song from the queue.',
		aliases: ['rm', 'rmv'],
		usage: 'remove [#]'
	},

	run: (tokens, message) => {

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('Remove what?! 🤨');
		if(verifyChannel(message, player)) return;

		const prefix = getPrefix(message);
		if(tokens.length != 1) return message.channel.send(new MessageEmbed().setDescription(`❗️**Incorrect amount of arguments.**\nPlease use \`${prefix}remove [#]\` to remove a song from the queue.`).setColor('00ff00'));
		if(isNaN(tokens[0])) return message.channel.send(new MessageEmbed().setDescription(`❗️**Incorrect use of the command.**\nPlease use \`${prefix}remove [NUMBER]\` to remove a song from the queue.`).setColor('00ff00'));
		if(tokens[0] == 0) return message.channel.send(new MessageEmbed().setDescription(`❌ **I cannot remove songs that are already playing.**\nUse \`${prefix}skip\` to go to the next song.`).setColor('00ff00'));
		if(tokens[0] > player.queue.size) return message.channel.send(new MessageEmbed().setDescription(`🧐 Song not found.`).setColor('00ff00'));

		// remove the song
		const { title } = player.queue[tokens[0]-1];
		player.queue.splice(tokens[0]-1, 1);
		message.channel.send(
			new MessageEmbed()
			.setDescription(`✅ ${title} was removed from the queue!`)
			.setColor('00ff00')
		);
	}
}