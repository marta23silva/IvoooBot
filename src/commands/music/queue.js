const discord = require('discord.js');
const { client } = require('../../../bot');
const { msToHMS } = require('../../utils/time');
const { stringCutter, getPrefix } = require('../../utils/tokenAdjuster');

module.exports = {
	run: async (tokens, message) => {
		
		const prefix = getPrefix(message);
		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send(`❗️**I'm not in a voice channel.** Type \`${prefix}entra\` to make me join one.`);
		if(player.queue.size == 0) return message.channel.send(new discord.MessageEmbed().setDescription('❗️ The queue is empty.').setColor('00ff00'));

		const next = player.queue;

		let index = 0;
		const indexes = next.map(() => `${++index}.`);
		const titles = next.map((track) =>`${stringCutter(track)}`);
		const duration = next.map((track) => `${msToHMS(track.duration)}`);

		message.channel.send(
			new discord.MessageEmbed()
			.setColor('00ff00')
			.setTitle('Queue')
			.setDescription('__Now Playing:__' + `\n${player.queue.current.title}` + '\n\n\n__Up Next:__')
			.addFields(
				{ name: '#', value: `${indexes.join(`\n`)}`, inline: true },
				{ name: 'Song', value: `${titles.join(`\n`)}`, inline: true },
				{ name: 'Length', value: `${duration.join(`\n`)}`, inline: true },
			)
		);
	},

	command: 'queue'
}