const { getPrefix } = require("../utils/utils");
const file = require("../../data/guilds.json");
const { customColor_msg } = require("../utils/embeds");

module.exports = {
  data: {
    name: "messageCreate",
  },

  async execute(message) {
    console.log(
      message.author.username + " said: " + message.content
    );

    if (message.author.bot) return;

    const prefix = getPrefix(message.guildId, file);
    if (message.mentions.has(message.client.user) && !message.mentions.everyone) {
      const prefixDisplay = customColor_msg(
        message.guild.me.displayHexColor,
        `My prefix is ${prefix}`
      );
      return message.reply({ embeds: [prefixDisplay] });
    }
    if (!message.content.toLowerCase().startsWith(prefix)) return;

    const tokens = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = tokens.shift().toLowerCase();

    const loaded =
      message.client.commands.get(command) ||
      message.client.aliases.get(command);
    if (!loaded) return;

    loaded.execute(message, tokens);
  },
};
