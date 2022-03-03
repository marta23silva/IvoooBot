const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const commands = require('../../../deploy-commands');

module.exports = {

	data: {
		name: 'deploy-commands',
		description: 'Deploys slash commands on the server.'
	},
	
	async execute(interaction, tokens) {

		if(interaction.author.id !== process.env.OWNER_ID) { 
			const embed = new MessageEmbed().setColor('#FFFF00')
			.setDescription(`❗️ You don't have permission to use that command.`);
			return interaction.reply({ embeds: [embed] });
		}
		const guildId = interaction.guildId;
		commands.deploy(guildId);
		const embed = new MessageEmbed().setColor('29dd00').setDescription('✅ Deployed commands on this server.');
		return interaction.reply({ embeds: [embed] });

	},
};