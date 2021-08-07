const discord = require('discord.js');
const { client } = require('../../../bot');

module.exports = {
	run: async (tokens, message) => {

		if(tokens[0]) return message.channel.send("Entro no voice chat se quiseres, noutros sítios não...");

		client.on("raw", (d) => client.manager.updateVoiceState(d));

		let player = client.manager.players.get(message.guild.id);
		if(!player) {
			player = client.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
			});
			player.connect();

			const res = await client.manager.search(
				process.env.LOCAL_FILE_WELCOME,
				message.author
			);

			if(res.loadType !== 'NO_MATCHES') {
				player.queue.add(res.tracks[0]);
				player.play();
			}
		} else {
			message.channel.send('Aii manooo, já estou no voice chat... Como é que queres que entre outra vez?');
		}
	},

	command: 'entra'
}