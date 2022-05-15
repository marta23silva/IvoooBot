const { MessageEmbed } = require("discord.js");
const ivoooTheIcon = "https://github.com/marta23silva/IvoooBot/blob/master/images/Banzai.png?raw=true";
const minecraftThumb = "https://github.com/marta23silva/IvoooBot/blob/master/images/Minecraft.jpeg?raw=true";

function error_msg(message) {
  return new MessageEmbed()
    .setColor("e30808")
    .setAuthor({
      name: `${message}`,
      iconURL: `${ivoooTheIcon}`,
    });
}

function warning_msg(message) {
  return new MessageEmbed()
    .setColor("#FFFF00")
    .setAuthor({
      name: `${message}`,
      iconURL: `${ivoooTheIcon}`,
    });
}

function success_msg(message) {
  return new MessageEmbed()
    .setColor("29dd00")
    .setAuthor({
      name: `${message}`,
      iconURL: `${ivoooTheIcon}`,
    });
}

function customColor_msg(color, message) {
  return new MessageEmbed()
    .setColor(color)
    .setAuthor({
      name: `${message}`,
      iconURL: `${ivoooTheIcon}`,
    });
}

function minecraftServerStatus_msg(color, message, description) {
  return new MessageEmbed()
    .setColor(color)
    .setAuthor({
      name: `${message}`,
      iconURL: `${ivoooTheIcon}`,
    })
    .setDescription(description)
    .setThumbnail(minecraftThumb);
}

function custom_msg(color, title, description) {
  return new MessageEmbed()
    .setColor(color)
    .setTitle(title)
    .setDescription(description)
    .setTimestamp();
}

function invite_msg(color, message, url) {
  return new MessageEmbed()
    .setColor(color)
    .setAuthor({
      name: `${message}`,
      iconURL: `${ivoooTheIcon}`,
      url: `${url}`,
    });
}

function addedToQueue_msg(color, title, author, length, requester, thumbnail) {
  return new MessageEmbed()
    .setColor(color)
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
  error_msg,
  warning_msg,
  success_msg,
  customColor_msg,
  minecraftServerStatus_msg,
  custom_msg,
  invite_msg,
  addedToQueue_msg,
};
