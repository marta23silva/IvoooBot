const { SlashCommandBuilder } = require("@discordjs/builders");
const { warning_msg } = require("../../utils/embeds");

const in_vc = warning_msg(`I'm already in a voice channel.`);
const join_vc = warning_msg(`Please, join a voice channel first.`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("join")
    .setDescription(`Joins the voice channel you're currently in.`),

  aliases: ["entra"],

  async execute(interaction) {
    const vChannel = interaction.member.voice.channel;
    if (!vChannel) return interaction.reply({ embeds: [join_vc] });

    const client = interaction.client;

    let player = client.manager.players.get(interaction.guild.id);
    if (player) return interaction.reply({ embeds: [in_vc] });

    player = client.manager.create({
      guild: interaction.guild.id,
      voiceChannel: vChannel.id,
      textChannel: interaction.channel.id,
    });
    player.connect();
    await interaction.reply("<:dragonExcited:951558941693853726>");

    const welcomeMsg = process.env.LOCAL_FILE_WELCOME;
    if (welcomeMsg) {
      const res = await client.manager.search(welcomeMsg, interaction.author);

      if (res.loadType !== "NO_MATCHES") {
        player.queue.add(res.tracks[0]);
        player.play();
      }
    }
  },
};
