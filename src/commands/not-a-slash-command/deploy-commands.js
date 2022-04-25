const { SlashCommandBuilder } = require("@discordjs/builders");
const { warning_msg, success_msg } = require("../../utils/embeds.js");
const commands = require("../../../deploy-commands");

module.exports = {
  data: {
    name: "deploy-commands",
    description: "Deploys slash commands on the server.",
  },

  aliases: ["dp", "deploy"],

  async execute(interaction) {
    if (interaction.author.id !== process.env.OWNER_ID) {
      const embed = warning_msg(
        `You don't have permission to use that command.`
      );
      return interaction.reply({ embeds: [embed] });
    }
    const guildId = interaction.guildId;
    commands.deploy(guildId);
    const embed = success_msg(`Deployed commands on this server ✅`);
    return interaction.reply({ embeds: [embed] });
  },
};
