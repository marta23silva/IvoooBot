const { MessageEmbed } = require('discord.js');
const { getPrefix } = require('./tokenAdjuster');

module.exports = {
	// checks if the user is in a voice channel or in the correct one
	verifyChannel: (message, player) => {
		if(!message.member.voice.channel) return message.channel.send(new MessageEmbed().setDescription(`Aii manooo, you have to be connected to a voice channel to use music commands.`).setColor('00ff00'));
		if(message.member.voice.channel != player.voiceChannel) return message.channel.send(new MessageEmbed().setDescription('❌ You need to be in the same voice channel as Ivooo to use this command.').setColor('00ff00'));
	}
}