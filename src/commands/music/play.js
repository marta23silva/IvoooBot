const discord = require('discord.js');
const { queues } = require('../../../bot');
const Queue = require('../../structures/Queue');
const { msToHMS } = require('../../utils');

module.exports = {
	run: async (tokens, message) => {
		if(!tokens[0]) return message.channel.send("Ivooo no understand 🤡 Please use 'ivooo play <url/song title>'");
		if(!message.member.voice.channel.id) return message.channel.send("Não estás no voice chat, mas queres que eu entre onde manooo?");

		if(!queues[message.guild.id]) {
			queues[message.guild.id] = new Queue(message.guild.id, message.member.voice.channel.id, message.channel);
		}

		const [ song ] = await queues[message.guild.id].search(tokens.join(' '));
		message.channel.send('song: ' + song);
		if(!song) return message.channel.send('Essa música não faz parte do meu repertório.');

		const isAdded = await queues[message.guild.id].play(song);

		if(isAdded) {
			message.channel.send(
				new discord.MessageEmbed()
				.setTitle("Singing next: " + nextSong.info.title)
				.addFields([
					{ inline: true, name: "Author", value: nextSong.info.author },
					{ inline: true, name: "Length", value: msToHMS(nextSong.info.length)},
					{ inline: true, name: "Link", value: nextSong.info.uri }
				])
				.setColor("00ff00")
			)
		}
	},

	command: 'play'
}