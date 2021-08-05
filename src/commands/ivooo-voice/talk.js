const discord = require('discord.js');
const { client } = require('../../../bot');
const fs = require('fs');
let audio_file;
const laugh = 'ed_laughing.mp3';

module.exports = {
	run: async (tokens, message) => {

		let player = client.manager.players.get(message.guild.id);
		if(!player) {
			player = client.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
			});
			player.connect();
		}

		let voiceChannel = message.member.voice.channel;
		if(!voiceChannel) return console.error('azaritos');

		voiceChannel.join().then(connection => {
			let files = fs.readdirSync('./audio');

			while(true) {
				audio_file = files[Math.floor(Math.random() * files.length)];
				if(audio_file.endsWith('.mp3') && audio_file !== laugh) { break; }
			}
			connection.play('./audio/' + audio_file);
		});
	},

	command: 'talk'
}