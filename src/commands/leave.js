const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("leave")
        .setDescription(`Leaves the voice channel.`),

    async execute(interaction) {

        

    },
};
