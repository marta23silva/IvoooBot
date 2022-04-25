const { SlashCommandBuilder } = require("@discordjs/builders");
const { warning_msg } = require("../../utils/embeds");
const { verifyChannel } = require("../../utils/utils");

const not_in_vc = warning_msg(`I'm not in a voice chat.`);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription(`Leaves the voice channel.`),

  aliases: ["sai"],

  async execute(interaction) {
    const client = interaction.client;
    let player = client.manager.players.get(interaction.guild.id);
    if (!player) return interaction.reply({ embeds: [not_in_vc] });
    if (verifyChannel(interaction, player)) return;

    await interaction.reply("<:catcry:921915462919528468>");

    player.queue.clear();
    player.stop();

    const byeMsg = process.env.LOCAL_FILE_BYE;
    if (byeMsg) {
      const res = await client.manager.search(byeMsg, interaction.author);

      if (res.loadType !== "NO_MATCHES") {
        player.queue.add(res.tracks[0]);
        player.play();
      }
    } else {
      player.destroy();
      return;
    }

    client.manager.on("queueEnd", (player) => {
      player.destroy();
    });
  },
};
