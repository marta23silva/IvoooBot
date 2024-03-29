const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel } = require("../util/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription(`Resumes the current song.`),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);

        if (verifyChannel(interaction, player)) return;
        
        if(player.paused) {
            player.pause(false);
            return interaction.reply(':arrow_forward: Resumed.');
		}
        return interaction.reply('???');
    },
};
