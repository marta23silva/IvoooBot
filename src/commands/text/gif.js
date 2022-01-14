const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {

	data: new SlashCommandBuilder()
	.setName('gif')
	.setDescription('Replies with a gif'),
	
	async execute(interaction) {
		let url = `https://g.tenor.com/v1/search?q=&key=${process.env.TENOR_KEY}&contentfilter=high`;
		let response = await fetch(url);
		let json = await response.json();
		let index = Math.floor(Math.random() * json.results.length);
		await interaction.reply(json.results[index].url);
	},
};