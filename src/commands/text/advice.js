const { SlashCommandBuilder } = require("@discordjs/builders");
const replies = require("../../utils/replies");
const { getRandomIndex } = require("../../utils/utils");

const acceptedCmds = {

  advice(isQuestion) {
    if(isQuestion)
      return replies.adviceQuestion_en[getRandomIndex(replies.adviceQuestion_en)];
    return replies.adviceReply_en[getRandomIndex(replies.adviceReply_en)];
  },
  beratung(isQuestion) {
    if(isQuestion)
      return replies.adviceQuestion_de[getRandomIndex(replies.adviceQuestion_de)];
    return replies.adviceReply_de[getRandomIndex(replies.adviceReply_de)];
  },
  conselho(isQuestion) {
    if(isQuestion)
      return replies.adviceQuestion_pt[getRandomIndex(replies.adviceQuestion_pt)];
    return replies.adviceReply_pt[getRandomIndex(replies.adviceReply_pt)];
  },

}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("advice")
    .setDescription("Ivooo is wise. Ivooo gives the best advice.")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("What do you want to ask Ivooo?")
        .setRequired(false)
    ),

  aliases: ["conselho", "beratung"],

  async execute(interaction) {

    let keyword;
    let isQuestion;
    if(!interaction.commandName) {
      // Prefix
      const messageContent = interaction.content.split(" ");
      keyword = messageContent[1];
      isQuestion =
        messageContent.length < 3
          ? false
          : true;
    } else {
      // Slash command
      keyword = interaction.commandName;
      isQuestion =
        !interaction.options.getString("question")
          ? false
          : true;
    }

    const chooseMessage = acceptedCmds[keyword.toLowerCase()];
    const msg = chooseMessage(isQuestion);
    interaction.reply(msg);
  },
};
