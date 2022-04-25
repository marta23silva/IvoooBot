const { SlashCommandBuilder } = require("@discordjs/builders");
const { adviceReply_en, adviceReply_pt } = require("../../utils/replies");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("advice")
    .setDescription("Ivooo is wise. Ivooo gives the best advice.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What do you want to ask Ivooo?")
        .setRequired(true)
    ),

  aliases: ["conselho"],

  async execute(interaction) {
    let index = Math.floor(Math.random() * adviceReply_en.length);
    const keyword =
      interaction.commandName != null
        ? interaction.commandName
        : interaction.content.split(" ")[1];

    if (keyword === "conselho") {
      index = Math.floor(Math.random() * adviceReply_pt.length);
      await interaction.reply(adviceReply_pt[index]);
    } else {
      await interaction.reply(adviceReply_en[index]);
    }
  },
};
