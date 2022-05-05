const { SlashCommandBuilder } = require("@discordjs/builders");
const { error_msg, addedToQueue_msg } = require("../../utils/embeds");
const { verifyChannel, msToHMS, isBlank } = require("../../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription(`▶️ Adds a track to the queue and plays it. Resumes it, if it is paused.`)
    .addStringOption((option) =>
      option
        .setName("search")
        .setDescription("Song name/url to play")
        .setRequired(false)
    ),

  aliases: [],

  async execute(interaction, tokens) {
    
    const client = interaction.client;
    const color = interaction.guild.me.displayHexColor;
    let isQueueEmpty = true;
    let isSlashCmd = true;
    let player = client.manager.players.get(interaction.guild.id);
    
    if (verifyChannel(interaction, player)) return;
    if (!player) {
      player = client.manager.create({
        guild: interaction.guild.id,
        voiceChannel: interaction.member.voice.channel.id,
        textChannel: interaction.channel.id,
      });
      player.connect();
    }

    let search, requester;
    if(interaction.options) {
      search = interaction.options.getString("search");
      requester = interaction.user.username + "#" + interaction.user.discriminator;
    } else {
      search = tokens.join(" ");
      requester = interaction.author.username + "#" + interaction.author.discriminator;
      isSlashCmd = false;
    }

    if (isBlank(search)) {
      if (player.paused) {
        player.pause(false);
        if(isSlashCmd)
          return interaction.reply("▶️");
        return interaction.react("▶️");
      }
      const badUsage = error_msg("Please specify a song by using /play [url/song title]");
      return interaction.reply({ embeds: [badUsage] });
    }

    const res = await client.manager.search(
      search,
      interaction.author
    );

    if (res.loadType === "NO_MATCHES") {
      const noMatches = error_msg('There were no matches for your search.')
      return interaction.reply({ embeds: [noMatches] });
    }

    const result = res.tracks[0];
    player.queue.add(result);

    let songAdded = addedToQueue_msg(
      color,
      "PLAYING NEXT: " + result.title,
      result.author,
      msToHMS(result.duration),
      requester,
      result.thumbnail
    );
    
    if (player.queue.size >= 1) {
      isQueueEmpty = false;
      interaction.reply({ embeds: [songAdded] });
    }
    if (!player.playing && !player.paused && !player.queue.size) {
      player.play();
    }
    if (!isQueueEmpty) { return; }

    songAdded = addedToQueue_msg(
      color,
      "NOW PLAYING: " + result.title,
      result.author,
      msToHMS(result.duration),
      requester,
      result.thumbnail
    );
    return interaction.reply({ embeds: [songAdded] });
    
  },
};
