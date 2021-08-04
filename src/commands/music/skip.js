const { client } = require('../../../bot');

module.exports = {
	run: (tokens, message) => {

		if(tokens[0]) return message.channel.send('I am sorry, what?');

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('mas eu nem estou a cantar manooo');
		player.stop();
	},

	command: 'skip'
}