const { SlashCommandBuilder } = require("@discordjs/builders");
const { writeFile } = require("fs");
const file = require("../../../data/guilds.json");
const { error_msg, success_msg } = require("../../utils/embeds");

const slashcmd_msg = error_msg(
  `You have to use the slash command to use "change-prefix".`
);
const noIndex_msg = error_msg(
  `Couldn't find your guild. Please contact my dev Mia#1362.`
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("change-prefix")
    .setDescription("Changes the prefix of the bot on your server.")
    .addStringOption((option) =>
      option
        .setName("prefix")
        .setDescription("New prefix")
        .setRequired(true)
    ),

  aliases: [],

  // TODO - add condition so only server owner can change prefix
  async execute(interaction) {

    if(!interaction.options) {
      return interaction.reply({ embeds: [slashcmd_msg] });
    }

    let index = -1;
    for(let i = 0; i < file.guilds.length; i++) {
      if(interaction.guildId === file.guilds[i].id) {
        console.log("Prefix before changing: " + file.guilds[i].prefix);
        index = i;
        break;
      }
    }

    if(index < 0) {
      return interaction.reply({ embeds: [noIndex_msg] });
    }

    const newPrefix = interaction.options.getString("prefix");
    file.guilds[index].prefix = newPrefix;

    writeFile("./data/guilds.json", JSON.stringify(file, null, 2), function writeJSON(err) {
      if (err) {
        return console.error(err);
      }
      console.log("Changed prefix to " + newPrefix);
    });

    const prefixChanged_msg = success_msg(
      `Prefix successfully changed to ${newPrefix}`
    );
    return interaction.reply({ embeds: [prefixChanged_msg] });
  },
};
