const { SlashCommandBuilder } = require("@discordjs/builders");
const { getSkylanderRandom } = require("skylander.js");

// want to add a 10 skylander quiz instead of only 1
// add embeds
module.exports = {
  data: new SlashCommandBuilder()
    .setName("skylander")
    .setDescription(
      "Sends an image of a Skylander. You have to guess its name."
    ),

  aliases: [],

  async execute(interaction) {
    let userInput;
    let isCorrect = false;
    let winnerId;

    const channel = interaction.client.channels.cache.get(
      interaction.channelId
    );

    interaction.reply(
      `You have 30 seconds to guess the Skylander's name correctly.`
    );

    const skylander = await getSkylanderRandom();
    if (!skylander) {
      return channel.send("There was an API error. Please try again later.");
    }
    await channel.send(skylander.forms[0]);
    console.log(skylander);
    const correctAnswer = skylander.name;

    const filter = (m) => !m.author.bot; // ignore bot messages
    const collector = interaction.channel.createMessageCollector({
      filter,
      time: 30000,
    });

    collector.on("collect", (m) => {
      userInput = m.content.toLowerCase();
      if (userInput === correctAnswer.toLowerCase()) {
        m.react("✅");
        isCorrect = true;
        winnerId = m.author.id;
        collector.stop();
      } else {
        m.react("❌");
      }
      console.log(`Collected ${m.content}`);
    });

    collector.on("end", () => {
      if (isCorrect) {
        channel.send(`<@${winnerId}> wins!`);
      } else {
        channel.send(`Time's Up! The correct answer was ${correctAnswer}.`);
      }
    });
  },
};
