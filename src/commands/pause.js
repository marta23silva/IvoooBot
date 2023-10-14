const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel } = require("../util/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription(`Pauses the current song.`),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);

        if (verifyChannel(interaction, player)) return;
        
        if(!player.paused) {
            player.pause(true);
            return interaction.reply(':pause_button: Paused.');
		}
        return interaction.reply('???');
    },
};
