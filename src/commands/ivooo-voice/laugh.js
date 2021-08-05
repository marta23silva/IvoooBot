const discord = require('discord.js');
const { client } = require('../../../bot');

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
		if(!voiceChannel) return message.channel.send('Please join a voice channel first.');

		voiceChannel.join().then(connection => {
			let audio_file = 'ed_laughing.mp3'
			connection.play('./audio/' + audio_file);
		});
	},

	command: 'laugh'
}