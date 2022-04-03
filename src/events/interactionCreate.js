module.exports = {

	data: {
		name: 'interactionCreate'
	},
	
	async execute(interaction) {
		// Ignore if it's not a command
		if (!interaction.isCommand()) return;
		const command = interaction.client.commands.get(interaction.commandName) || interaction.client.aliases.get(interaction.commandName);

		// Ignore if command does not exist
		if(!command) return;

		try { await command.execute(interaction); }
		catch (error) { await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); }
	}
};