const { EmbedBuilder } = require("discord.js");
const { COLOUR_YELLOW, COLOUR_RED, COLOUR_GREEN } = require("./constants");

function warning_msg(message) {
    return new EmbedBuilder()
      .setColor(COLOUR_YELLOW)
      .setAuthor({
        name: `${message}`,
    });
}

function error_msg(message) {
    return new EmbedBuilder()
      .setColor(COLOUR_RED)
      .setAuthor({
        name: `${message}`,
    });
}

function addedToQueue_msg(title, author, length, requester, thumbnail) {
  return new EmbedBuilder()
    .setColor(COLOUR_GREEN)
    .setTitle(title)
    .addFields([
      {
        name: "Author",
        value: `${author}`,
        inline: true,
      },
      {
        name: "Length",
        value: `${length}`,
        inline: true,
      },
      {
        name: "Requester",
        value: `${requester}`,
        inline: true,
      }
    ])
    .setThumbnail(thumbnail);
}

module.exports = {
  warning_msg,
  error_msg,
  addedToQueue_msg,
};