const { client } = require('../../../bot');

module.exports = {
	run: (tokens, message) => {

		if(tokens[0]) return message.channel.send('estás a mandar-me sair de onde? tenho o direito de estar aqui! quero o livro de reclamações 😡');

		const player = client.manager.players.get(message.guild.id);
		if(!player) return message.channel.send('mas eu nem estou no voice chat manooo');
		message.channel.send('Ivooo sai, Ivooo entra... O dia todo nisto, mas pagar ordenado está quieto!');
		player.destroy();
	},

	command: 'sai'
}