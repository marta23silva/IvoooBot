const discord = require('discord.js');
const { queues } = require('../../../bot');
const Queue = require('../../structures/Queue');
const { msToHMS } = require('../../utils');

module.exports = {
	run: async (tokens, message) => {
		if(!queues[message.guild.id]) return message.channel.send("I'm not singing right now");

		const song = queues[message.guild.id].currentlyPlaying;

		message.channel.send(
			new discord.MessageEmbed()
				.setTitle("Singing next: " + nextSong.info.title)
				.addFields([
					{ inline: true, name: "Author", value: song.info.author },
					{ inline: true, name: "Length", value: msToHMS(song.info.length)},
					{ inline: true, name: "Link", value: song.info.uri }
				])
				.setColor("00ff00")
		);
	},

	command: 'np'
}