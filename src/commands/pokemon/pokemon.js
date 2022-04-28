const { SlashCommandBuilder } = require("@discordjs/builders");
const { getPokemonRandom } = require("pokedev.js");

// this will be a pokemon quiz
module.exports = {
    data: new SlashCommandBuilder()
      .setName("pokemon")
      .setDescription("Gives image of a random pokemon."),
  
    aliases: [],
  
    async execute(interaction) {
      const p = await getPokemonRandom();
      await interaction.reply(p.forms[0]);
    },
};