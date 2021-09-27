const { client } = require('../../../bot');
const { verifyChannel } = require('../../utils/musicVerify');

module.exports = {
	command: {
		name: 'disconnect',
		category: 'Music',
		description: 'Leaves the voice channel.',
		aliases: ['sai', 'leave'],
		usage: 'disconnect'
	},

	run: async (tokens, message) => {

		if(tokens[0]) return message.channel.send('estás a mandar-me sair de onde? tenho o direito de estar aqui! quero o livro de reclamações 😡');

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('mas eu nem estou no voice chat manooo');
		if(verifyChannel(message, player)) return;
		
		const res = await client.manager.search(
			process.env.LOCAL_FILE_BYE,
			message.author
		);

		player.queue.clear();
		player.stop();
		if(res.loadType === 'NO_MATCHES') {
			player.destroy();
			message.react('👋');
			return;
		}
		player.queue.add(res.tracks[0]);
		player.play();

		client.manager.on('queueEnd', (player) => {
			player.destroy();
			message.react('👋');
		});
	}
}