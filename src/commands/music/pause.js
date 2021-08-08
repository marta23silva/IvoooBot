const { client } = require('../../../bot');

module.exports = {
	run: (tokens, message) => {

		if(tokens[0]) return message.channel.send('I do not understand that... yet 😌');

		const player = client.manager.players.get(message.guild.id);
		if(!player || !player.playing) return message.channel.send('I am not playing music 🤨 Pause what?!');
		
		if(!player.paused) {
			player.pause(true);
			message.react('⏸');
		}
	},

	command: 'pause'
}