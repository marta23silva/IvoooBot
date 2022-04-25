const { SlashCommandBuilder } = require("@discordjs/builders");
const { error_msg, custom_msg } = require("../../utils/embeds");
const { shuffle } = require("../../utils/utils");

const slashcmd_msg = error_msg(
  `You have to use the slash command to use "random-picker".`
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random-picker")
    .setDescription("Selects a random item from the list.")
    .addStringOption((option) =>
      option
        .setName("list")
        .setDescription(
          "Items of the list [ SEPARATE EACH ITEM WITH A COMMA (,) ]"
        )
        .setRequired(true)
    ),

  aliases: ["pick"],

  async execute(interaction) {
    if (!interaction.options) {
      return interaction.reply({ embeds: [slashcmd_msg] });
    }
    const list = interaction.options.getString("list").split(",");
    const color = interaction.guild.me.displayHexColor;
    let index = Math.floor(Math.random() * list.length);

    const response = custom_msg(color, "Random Picker", list[index]);
    try {
      await interaction.reply({ embeds: [response] });
    } catch (err) {
      return interaction.reply(
        "Some weird error occurred... Try again later, I guess? 🤪"
      );
    }
  },
};
