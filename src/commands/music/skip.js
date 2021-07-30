const discord = require('discord.js');
const { queues } = require('../../../bot');
const Queue = require('../../structures/Queue');
const { msToHMS } = require('../../utils');

module.exports = {
	run: async (tokens, message) => {
		if(!message.member.voice.channel.id) return message.channel.send("You're not in a voice channel, you can't skip.");
		if(!queues[message.guild.id]) return message.channel.send("Nothing is playing!");

		queues[message.guild.id]._playNext();
	},

	command: 'skip'
}