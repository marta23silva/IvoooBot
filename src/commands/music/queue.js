const discord = require('discord.js');
const { queues } = require('../../../bot');
const Queue = require('../../structures/Queue');
const { msToHMS } = require('../../utils');

module.exports = {
	run: async (tokens, message) => {
		if(!queues[message.guild.id]) return message.channel.send("I'm not singing right now");

		const next = queues[message.guild.id].queue;
		const text = next.map((song, index) => `${++index} ${song.info.title} - ${song.info.author} - ${msToHMS(song.info.length)}`);

		message.channel.send(
			new discord.MessageEmbed()
			.setTitle("✨Queue✨")
			.setDescription(`\`\`\`\n${text.join(`\n`) || "Nothing in queue"}\n\`\`\``)
			.setColor('00ff00')
		);
	},

	command: 'queue'
}