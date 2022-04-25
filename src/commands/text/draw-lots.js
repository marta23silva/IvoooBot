const { SlashCommandBuilder } = require("@discordjs/builders");
const { error_msg, custom_msg } = require("../../utils/embeds");
const { shuffle } = require("../../utils/utils");

const slashcmd_msg = error_msg(
  `You have to use the slash command to use "draw-lots".`
);
const length_msg = error_msg(`Your lists don't have the same length.`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("draw-lots")
    .setDescription(
      "Assigns one item of the first list to another one of the second list."
    )
    .addStringOption((option) =>
      option
        .setName("list1")
        .setDescription(
          "Items of the 1st list [ SEPARATE EACH ITEM WITH A COMMA (,) ]"
        )
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("list2")
        .setDescription(
          "Items of the 2nd list [ SEPARATE EACH ITEM WITH A COMMA (,) ]"
        )
        .setRequired(true)
    ),

  aliases: ["sorteio"],

  async execute(interaction) {
    if (!interaction.options) {
      return interaction.reply({ embeds: [slashcmd_msg] });
    }
    const list1 = interaction.options.getString("list1").split(",");
    let list2 = interaction.options.getString("list2").split(",");
    const color = interaction.guild.me.displayHexColor;

    let shuffled = [];
    shuffle(list2);

    if (list1.length !== list2.length) {
      return interaction.reply({ embeds: [length_msg] });
    }

    for (let i = 0; i < list1.length; i++) {
      shuffled.push("**" + list1[i] + "** - " + list2[i]);
    }

    const response = custom_msg(color, "Draw Lots", shuffled.join("\n\n"));
    try {
      await interaction.reply({ embeds: [response] });
    } catch (err) {
      return interaction.reply(
        "Some weird error occurred... Try again later, I guess? 🤪"
      );
    }
  },
};
