module.exports = {
	run: async (tokens, message) => {
		let keywords = tokens.join(" ");
		if(keywords === 'hello') {
			message.channel.send('https://tenor.com/73qy.gif');
		} else if(keywords === 'happy birthday') {
			message.channel.send('https://tenor.com/7Z1g.gif');
		} else {
			message.channel.send('https://tenor.com/NrBf.gif');
		}
	},

	command: 'say'
}