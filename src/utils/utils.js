const { warning_msg } = require('./embeds');

const in_vc = warning_msg(`I'm already in a different voice channel. Trying to kidnap me to another one?`);
const join_vc = warning_msg(`Please, join a voice channel first.`);

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function verifyChannel(interaction, player) {
    if(!interaction.member.voice.channel) return interaction.reply({ embeds: [ join_vc ] });
    if(player && interaction.member.voice.channel != player.voiceChannel) return interaction.reply({ embeds: [ in_vc ] })
}

module.exports = { shuffle, verifyChannel };