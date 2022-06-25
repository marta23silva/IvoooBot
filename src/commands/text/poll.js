const { SlashCommandBuilder } = require("@discordjs/builders");
const { error_msg, custom_msg } = require("../../utils/embeds");
const { emojiNumbers } = require('../../utils/utils');

const slashcmd_msg = error_msg(
  `You have to use the slash command to use "poll".`
);
const length_msg = error_msg(
  `You exceeded the max of items on the poll, which is 10.`
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("poll")
    .setDescription("Starts a poll.")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Description of the poll")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("items")
        .setDescription(
          "Items of the poll [ SEPARATE EACH ITEM WITH A COMMA (,) ]"
        )
        .setRequired(true)
    ),

  aliases: ["sondagem"],

  async execute(interaction) {
    if (!interaction.options) {
      return interaction.reply({ embeds: [slashcmd_msg] });
    }
    const title = interaction.options.getString("title");
    const dscrpt = interaction.options.getString("description");
    const items = interaction.options.getString("items").split(",");
    const color = interaction.guild.me.displayHexColor;
    let options = [];

    if (items.length > 10) {
      return interaction.reply({ embeds: [length_msg] });
    }

    options.push(dscrpt);
    for (let i = 0; i < items.length; i++) {
      options.push(emojiNumbers[i] + " - " + items[i]);
    }

    const response = custom_msg(color, title, options.join("\n\n"));
    try {
      const message = await interaction.reply({
        embeds: [response],
        fetchReply: true,
      });
      for (let i = 0; i < items.length; i++) {
        message.react(emojiNumbers[i]);
      }
    } catch (err) {
      return interaction.reply(
        "Some weird error occurred... Try again later, I guess? 🤪"
      );
    }
  },
};
