const { SlashCommandBuilder } = require("@discordjs/builders");
const { invite_msg } = require("../../utils/embeds");
const { isBlank } = require("../../utils/utils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Provides the invitation link."),

  aliases: [],

  async execute(interaction) {
    const color = interaction.guild.me.displayHexColor;
    let message = 'Would you be so kind to invite me to your server? Click here!';
    const url = process.env.INVITE_URL;
    if(isBlank(url)) {
      message = `I'm flattered that you want to invite me to your server. Unfortunately, my owner is a disgrace and didn't provide a link... My apologies.`
    }
    const invite = invite_msg(color, message, url);
    interaction.reply({ embeds: [invite] });
  },
};
