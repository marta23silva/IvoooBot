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
		} else {
			message.channel.send('Aii manooo, já estou no voice chat... Como é que queres que entre outra vez?');
		}
		
	},

	command: 'entra'
}
