const { warning_msg } = require("./embeds");

const emojiNumbers = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟"];

const in_vc = warning_msg(
  `I'm already in a different voice channel. Trying to kidnap me to another one?`
);
const join_vc = warning_msg(`Please, join a voice channel first.`);

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

function verifyChannel(interaction, player) {
  if (!interaction.member.voice.channel)
    return interaction.reply({ embeds: [join_vc] });
  if (player && interaction.member.voice.channel != player.voiceChannel)
    return interaction.reply({ embeds: [in_vc] });
}

function isBlank(text) {
  if(text === "" || text === " " || text === null || text === undefined)
    return true;
  return false;
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

function timestampToDate(timestamp) {
  const date = new Date(timestamp);

  return date.getDate() + "/" +
    (date.getMonth() + 1) + "/" +
    date.getFullYear() + " " +
    date.getHours() + ":" +
    date.getMinutes() + ":" +
    date.getSeconds();
}

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getPrefix(guildId, file) {
  let index = -1;
  for(let i = 0; i < file.guilds.length; i++) {
    if(guildId === file.guilds[i].id) {
      index = i;
      break;
    }
  }
  if(index > -1)
    return file.guilds[index].prefix;
  return "ivooo";
}

function getCorrectAnswerNumber(array, answer) {
  for(let i = 0; i < array.length; i++) {
    if(array[i] === answer) {
      return i+1;
    }
  }
  return null;
}

module.exports = { 
  emojiNumbers,
  shuffle,
  verifyChannel,
  isBlank,
  msToHMS,
  timestampToDate,
  getRandomIndex,
  getPrefix,
  getCorrectAnswerNumber,
};
