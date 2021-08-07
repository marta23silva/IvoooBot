const { client } = require('../../../bot');

module.exports = {
	run: async (tokens, message) => {

		if(tokens[0]) return message.channel.send('estás a mandar-me sair de onde? tenho o direito de estar aqui! quero o livro de reclamações 😡');

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('mas eu nem estou no voice chat manooo');
		
		const res = await client.manager.search(
			process.env.LOCAL_FILE_BYE,
			message.author
		);

		player.queue.clear();
		player.stop();
		if(res.loadType === 'NO_MATCHES') {
			player.destroy();
			return;
		}
		player.queue.add(res.tracks[0]);
		player.play();

		client.manager.on('queueEnd', (player) => {
			player.destroy();
		});
	},

	command: 'sai'
}