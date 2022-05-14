const { Client, Intents, Collection } = require("discord.js");
const { argv } = require('node:process');
require("dotenv").config();

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
  ],
});

client.commands = new Collection();
client.aliases = new Collection();
if(argv[2] && argv[2] === "lavalink") {
  client.manager = require("./src/utils/manager")(client);
  client.on("raw", (d) => client.manager.updateVoiceState(d));
}

const { registerCommands, registerEvents } = require("./src/utils/register");
registerCommands(client, "../commands");
registerEvents(client, "../events");

client.login(process.env.BOT_TOKEN);
