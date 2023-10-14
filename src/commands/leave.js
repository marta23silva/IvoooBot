const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel } = require("../util/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription(`Leaves the voice channel.`),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);

        if (verifyChannel(interaction, player)) return;

        player.queue.clear();
        player.stop();
        player.destroy();
        return interaction.reply('Bye bye!');
    },
};
