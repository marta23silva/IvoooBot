module.exports = {
	run: async (tokens, message) => {
		let keywords = tokens.join(" ");
		if(keywords === 'job') {
			message.channel.send('https://tenor.com/bd6ds.gif');
			message.react('😁');
		} else if(keywords === 'bot' || keywords === 'boy') {
			message.channel.send('https://tenor.com/V0YP.gif');
			message.react('❤️');
		} else {
			message.channel.send('https://tenor.com/KdfT.gif');
		}
	},

	command: 'good',

	aliases: []
}