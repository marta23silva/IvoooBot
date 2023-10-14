const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Displays the client's ping."),

    async execute(interaction) {
        const client = interaction.client;
        await interaction.reply(`:ping_pong: **Pong!** API latency: ${Math.round(client.ws.ping)}ms`);
        setTimeout(() => {
            interaction.editReply(`:ping_pong: **Pong!** API latency: ${Math.round(client.ws.ping)}ms`);
        }, 120000);
    },
}