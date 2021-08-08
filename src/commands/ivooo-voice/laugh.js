const discord = require('discord.js');
const { client } = require('../../../bot');

module.exports = {
	run: async (tokens, message) => {

		let player = client.manager.players.get(message.guild.id);
		if(player) {
			message.channel.send("Can't laugh right now, otherwise you won't hear the music I'm playing.");
			return;
		}

		let voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.channel.send('Please join a voice channel first.');

		voiceChannel.join().then(connection => {
			let audio_file = 'ed_laughing.mp3'
			const dispatcher = connection.play('./audio/' + audio_file);

			dispatcher.on('finish', () => {
				dispatcher.destroy();
				voiceChannel.leave();
			});
		});
	},

	command: 'laugh'
}