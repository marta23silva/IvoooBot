const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel } = require("../util/utils");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription(`Stops the current song and clears the queue.`),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);

        if (verifyChannel(interaction, player)) return;
        
        player.queue.clear();
        player.stop();
        return interaction.reply(':stop_button: Stopped.');
    },
};
