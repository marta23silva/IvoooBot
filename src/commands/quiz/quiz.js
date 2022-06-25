const { SlashCommandBuilder } = require("@discordjs/builders");
const fetch = require('node-fetch');
const { custom_msg } = require("../../utils/embeds");
const { shuffle, getCorrectAnswerNumber, emojiNumbers } = require('../../utils/utils');

async function sendMessage(interaction, embed, size) {
  const msg = await interaction.reply({
    embeds: [embed],
    fetchReply: true,
  });
  for(let i = 0; i < size; i++) {
    msg.react(emojiNumbers[i]);
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("quiz")
    .setDescription("Sends a question."),

  aliases: [],

  async execute(interaction) {

    fetch('https://opentdb.com/api.php?amount=1&difficulty=easy&type=multiple').then(response => {
      return response.json();
    }).then(data => {
      
      const item = data.results[0];
      const question = item.question;
      const correctAnswer = item.correct_answer;
      let items = item.incorrect_answers;
      
      items.push(correctAnswer);
      shuffle(items);
      const correctNumber = getCorrectAnswerNumber(items, correctAnswer);
      // temp
      console.log('Correct answer = ' + correctNumber);

      let options = [];
      for(let i = 0; i < items.length; i++) {
        options.push(emojiNumbers[i] + " - " + items[i]);
      }

      const color = interaction.guild.me.displayHexColor;
      const embed = custom_msg(color, question, options.join("\n\n"));
      sendMessage(interaction, embed, options.length);

    });
  },
};
