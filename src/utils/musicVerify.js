const embed = require('./messageEmbed');

module.exports = {
	// checks if the user is in a voice channel or in the correct one
	verifyChannel: (message, player) => {
		if(!message.member.voice.channel) return message.channel.send(embed.embed_yellow_warning(`❗️ Aii manooo, you have to be connected to a voice channel to use music commands.`));
		if(message.member.voice.channel != player.voiceChannel) return message.channel.send(embed.embed_yellow_warning('❗️ You need to be in the same voice channel as Ivooo to use this command.'));
	}
}