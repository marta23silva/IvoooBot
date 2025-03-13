const { SlashCommandBuilder } = require("@discordjs/builders");
const genshindb = require('genshin-db');
const { genshinCharacter_msg } = require("../util/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("genshin")
        .setDescription(`Command to see info.`)
        .addStringOption((option) =>
            option
            .setName('character')
            .setDescription('Name of the character you want info about.')
            .setRequired(true)
        ),

    async execute(interaction) {

        let character;
        if(interaction.options)
            character = interaction.options.getString("character");

        const characterInfo = genshindb.characters(character);
        console.log(characterInfo);
        
        if (typeof characterInfo === 'undefined')
            return interaction.reply('There is no information about the character you specified.');
  
        const embedCharacter = genshinCharacter_msg(characterInfo);
        return interaction.reply({ embeds: [embedCharacter] });
    },
};
