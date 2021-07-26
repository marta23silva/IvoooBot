const fetch = require('node-fetch');

module.exports = async function (msg, args) {

	let keywords = args.join(" ");
	let url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=high`;
	let response = await fetch(url);
	let json = await response.json();
	let index = Math.floor(Math.random() * json.results.length);
	msg.channel.send(json.results[index].url);
	msg.channel.send('Vê lá se me páras de pedir gifs, não sou o teu Ambrósio! Daqui a bocado estás a pedir-me um Ferrero Rocher...');
}