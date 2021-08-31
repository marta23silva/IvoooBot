const fetch = require('node-fetch');

module.exports = {
	run: async (tokens, message) => {
		let keywords;
		if(!tokens[0]) {
			keywords = "";
			message.channel.send("Ai manooo, toma lá um gif qualquer!");
		} else {
			keywords = tokens.join(" ");
		}
		let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=high`;
		let response = await fetch(url);
		let json = await response.json();
		let index = Math.floor(Math.random() * json.results.length);
		message.channel.send(json.results[index].url);
	},

	command: 'gif',

	aliases: ['g']
}