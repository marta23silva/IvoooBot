const discord = require('discord.js');
const { client } = require('../../../bot');
const { msToHMS } = require('../../utils/time');

// maybe an option to clear the queue ?

module.exports = {
	run: async (tokens, message) => {

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send("I'm not singing right now");
		if(player.queue.size == 0) return message.channel.send('The queue is empty right now!');

		const next = player.queue;
		console.log('next: ' + next);
		const text = next.map((track, index) => `${++index}) ${track.title} - ${msToHMS(track.duration)}`);
		console.log('text: ' + text);

		message.channel.send(
			new discord.MessageEmbed()
			.setTitle("✨QUEUE✨")
			.setDescription(`\`\`\`\n${text.join(`\n`)}\n\`\`\``)
			.setColor('00ff00')
		);
	},

	command: 'queue'
}