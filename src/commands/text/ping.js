const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

	data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Pong!'),
	
	aliases: [],

	async execute(interaction, tokens) {
		
		if(interaction.content) {
			const msg = await interaction.reply('Pinging...');
			await msg.edit('🏓 Pong! ' + Math.round((msg.createdTimestamp - interaction.createdTimestamp) - interaction.client.ws.ping) + ' ms');
		} else {
			const msg = await interaction.reply({ content: 'Pinging...', fetchReply: true });
			await interaction.editReply('🏓 Pong! ' + Math.round((msg.createdTimestamp - interaction.createdTimestamp) - interaction.client.ws.ping) + ' ms');
		}
	},
};