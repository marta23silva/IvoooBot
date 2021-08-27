const { client } = require('../../../bot');
const { verifyChannel } = require('../../utils/musicVerify');

module.exports = {
	run: (tokens, message) => {

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('Mas eu nem estou a cantar manooo');
		if(verifyChannel(message, player)) return;
		if(!player.playing && player.queue.size == 0 && !player.paused) return message.channel.send(`🤨 There's nothing to skip...`);
		
		player.stop();
		message.react('⏩');
	},

	command: 'skip'
}