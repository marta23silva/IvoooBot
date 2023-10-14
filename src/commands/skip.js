const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription(`Skips the current song.`),

    async execute(interaction) {

        

    },
};
