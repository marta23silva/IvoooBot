const { SlashCommandBuilder } = require("@discordjs/builders");
const { getPokemonRandom } = require("pokedev.js");

// want to add a 10 pokemon quiz instead of only 1
// add embeds
module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Sends an image of a Pokemon. You have to guess its name."),

  aliases: [],

  async execute(interaction) {
    let userInput;
    let isCorrect = false;
    let winnerId;

    const channel = interaction.client.channels.cache.get(
      interaction.channelId
    );

    interaction.reply(
      `You have 30 seconds to guess the Pokemon's name correctly.`
    );

    const pokemon = await getPokemonRandom();
    if (!pokemon) {
      return channel.send("There was an API error. Please try again later.");
    }
    await channel.send(pokemon.forms[0]);
    console.log(pokemon);
    const correctAnswer = pokemon.name;

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
