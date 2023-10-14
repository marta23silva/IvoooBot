const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel } = require("../util/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription(`Skips the current song.`),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);

        if (verifyChannel(interaction, player)) return;
        if (!player.playing && player.queue.size == 0 && !player.paused) return interaction.reply('There is nothing to skip.');
		
        player.stop();
        interaction.reply(':fast_forward: Song skipped.');
    },
};
