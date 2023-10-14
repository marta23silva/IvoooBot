const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription(`Pauses the current song.`),

    async execute(interaction) {

        

    },
};
