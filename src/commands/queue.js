const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription(`Displays the music queue.`),

    async execute(interaction) {

        

    },
};
