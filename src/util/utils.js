const { warning_msg } = require("./embeds");

const join_vc = warning_msg(`Please, join a voice channel first.`);
const in_vc = warning_msg(`I'm already in a different voice channel. Are you trying to kidnap me to another one?`);

function verifyChannel(interaction, player) {
  if (!interaction.member.voice.channel)
    return interaction.reply({ embeds: [join_vc] });
  if (player && interaction.member.voice.channel != player.voiceChannel)
    return interaction.reply({ embeds: [in_vc] });
}

function msToHMS(duration) {
  let seconds = parseInt((duration/1000)%60);
  let minutes = parseInt((duration/(1000*60))%60);
  let hours = parseInt((duration/(1000*60*60)));

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

module.exports = {
  verifyChannel,
  msToHMS,
};