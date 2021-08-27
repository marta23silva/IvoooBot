const { client } = require('../../../bot');
const { verifyChannel } = require('../../utils/musicVerify');

module.exports = {
	run: (tokens, message) => {

		if(tokens[0]) return message.channel.send('you want me to stop what?');

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('mas eu nem estou a cantar manooo');
		if(verifyChannel(message, player)) return;
		
		player.queue.clear();
		player.stop();
		message.react('⏹');
	},

	command: 'stop'
}