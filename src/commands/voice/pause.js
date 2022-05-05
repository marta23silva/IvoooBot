const { SlashCommandBuilder } = require("@discordjs/builders");
const { error_msg } = require("../../utils/embeds");
const { verifyChannel } = require("../../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription(`⏸ Pauses the currently playing track.`),

  aliases: [],

  async execute(interaction, tokens) {
    
    const client = interaction.client;
    const sender = tokens ? interaction.author.username : interaction.user.username;
    let player = client.manager.players.get(interaction.guild.id);

    if (!player) {
      const noPlayer = error_msg("There is nothing to pause.");
      return interaction.reply({ embeds: [noPlayer] });
    }
    if (verifyChannel(interaction, player)) return;

    if (!player.paused) {
        player.pause(true);
        if(tokens)
            return interaction.react("⏸");
        return interaction.reply("⏸");
    }
    return interaction.reply("I'm already paused, bro. Ivooo dumb? More like " + sender + " dumb.");
  },
};
