const discord = require('discord.js');
const { client } = require('../../../bot');
const fs = require('fs');
let audio_file;
const laugh = 'ed_laughing.mp3';

module.exports = {
	run: async (tokens, message) => {

		let player = client.manager.players.get(message.guild.id);
		if(player) {
			message.channel.send("Can't talk right now, otherwise you won't hear the music I'm playing.");
			return;
		}

		let voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return message.channel.send('Please join a voice channel first.');

		voiceChannel.join().then(connection => {
			let files = fs.readdirSync('./audio');

			while(true) {
				audio_file = files[Math.floor(Math.random() * files.length)];
				if(audio_file.endsWith('.mp3') && audio_file !== laugh) { break; }
			}
			const dispatcher = connection.play('./audio/' + audio_file);

			dispatcher.on('finish', () => {
				dispatcher.destroy();
				voiceChannel.leave();
			});
		});
	},

	command: 'talk'
}