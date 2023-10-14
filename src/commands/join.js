const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel } = require("../util/utils");
const { error_msg } = require("../util/embeds");

const unavailable = error_msg(`Music is not available right now.`);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("join")
        .setDescription(`Joins the current voice channel.`),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);
        if (verifyChannel(interaction, player)) return;

        try {
            player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
            });
            player.connect();
            await interaction.reply("<a:cat_vibeowo:1051486223308431401>");
        } catch(error) {
            return interaction.reply({ embeds: [unavailable] });
        }
    },
};
