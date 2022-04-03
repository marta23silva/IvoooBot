const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {

	data: new SlashCommandBuilder()
	.setName('gif')
	.setDescription('Replies with a gif.')
	.addStringOption(option => option.setName('search').setDescription('Theme of the gif you want Ivooo to send')),
	
	aliases: [],

	async execute(interaction, tokens) {
		let keywords = '';
		let search;
		// check if it is a slash command with options or not
		if(interaction.options) {
			search = interaction.options.get('search');
			if(search && search.value) { keywords = search.value; }
		} else { keywords = tokens.join(' '); }

		const url = `https://g.tenor.com/v1/search?q=${keywords}&key=${process.env.TENOR_KEY}&contentfilter=high`;
		const response = await fetch(url);
		const json = await response.json();
		const index = Math.floor(Math.random() * json.results.length);
		await interaction.reply(json.results[index].url);
	},
};