const { SlashCommandBuilder } = require("@discordjs/builders");
const minecraft = require("minecraft-server-util");
const {
  minecraftServerStatus_msg,
  warning_msg,
} = require("../../utils/embeds");

let SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = 25565; // default minecraft server port
let info,
  lastUpdated = 0;
const cacheTime = 15 * 1000;
const PLAYING = "{players} people are playing!";

const no_ip = warning_msg(`Please specify a server IP address.`);

const options = {
  timeout: 1000 * 5,
  enableSRV: true,
};

function getStatus() {
  if (Date.now() < lastUpdated + cacheTime) return Promise.resolve(info);
  return minecraft
    .status(SERVER_ADDRESS, SERVER_PORT, options)
    .then((response) => {
      info = response;
      lastUpdated = Date.now();
      return info;
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("minecraft")
    .setDescription("Shows Minecraft server status.")
    .addStringOption((option) =>
      option.setName("address").setDescription("IP address of your server")
    ),

  aliases: [],

  async execute(interaction) {
    // Get IP specified by the user
    let address = interaction.options.getString("address");
    if (address) {
      SERVER_ADDRESS = address;
    }

    if (!SERVER_ADDRESS) {
      return interaction.reply({ embeds: [no_ip] });
    }

    const channel = interaction.client.channels.cache.get(
      interaction.channelId
    );
    interaction.reply("Checking if the server is up...");

    getStatus()
      .then((data) => {
        const PLAYERS_STATUS = data.players.online
          ? PLAYING.replace("{players}", data.players.online)
          : "Nobody is playing.";
        const status = minecraftServerStatus_msg(
          "29dd00",
          "Minecraft server is online!",
          PLAYERS_STATUS
        );
        return channel.send({ embeds: [status] });
      })
      .catch((err) => {
        const status = minecraftServerStatus_msg(
          "e30808",
          "Minecraft server is offline!",
          ""
        );
        return channel.send({ embeds: [status] });
      });
  },
};
