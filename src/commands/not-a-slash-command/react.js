const { getPrefix } = require("../../utils/utils");
const file = require("../../../data/guilds.json");
let say = false;

const acceptedCmds = {
  dumb() {
    return "https://tenor.com/bpbwu.gif";
  },
  good(interaction, alias) {
    if (alias[1] === "bot" || alias[1] === "boy") {
      interaction.react("❤️");
      return "https://tenor.com/V0YP.gif";
    } else if (alias[1] === "job") {
      interaction.react("😁");
      return "https://tenor.com/bd6ds.gif";
    } else {
      interaction.react("🤭");
      return "https://tenor.com/KdfT.gif";
    }
  },
  say(interaction, alias) {
    if (!alias[1]) return "https://tenor.com/tQTC.gif";
    if (alias[1] === "hello") {
      return "https://tenor.com/73qy.gif";
    } else if (alias[1] === "happy" && alias[2] === "birthday") {
      return "https://tenor.com/7Z1g.gif";
    } else {
      say = true;
      alias.shift();
      interaction.delete();
      return alias.join(" ");
    }
  },
  react() {
    return "https://tenor.com/3cjA.gif";
  },
};

module.exports = {
  data: {
    name: "react",
    description: "Sends a different reaction based on what you say.",
  },

  aliases: ["dumb", "burro", "good", "say"],

  async execute(interaction) {
    say = false;
    const channel = interaction.client.channels.cache.get(
      interaction.channelId
    );
    const prefix = getPrefix(interaction.guildId, file);
    const alias = interaction.content.slice(prefix.length).trim().split(/ +/g);
    if (alias[0] === "burro") {
      alias[0] = "dumb";
    }
    const chooseMessage = acceptedCmds[alias[0].toLowerCase()];
    const msg = chooseMessage(interaction, alias);
    if (say === true) {
      return channel.send(msg);
    }
    return channel.send(msg);
  },
};
