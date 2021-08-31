module.exports = {
	run: async (tokens, message) => {
		
		if(!tokens[0]) return message.channel.send('https://tenor.com/bfs53.gif');

		let keywords = tokens.join(" ");
		if(keywords === 'hello') {
			message.channel.send('https://tenor.com/73qy.gif');
		} else if(keywords === 'happy birthday') {
			message.channel.send('https://tenor.com/7Z1g.gif');
		} else {
			message.channel.send(tokens.join(' '));
		}
	},

	command: 'say',

	aliases: []
}