const { Client, Intents, Collection } = require("discord.js");
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
client.manager = require("./src/utils/manager")(client);

client.once("ready", () => {
  console.log("Hello! 🖤");
  client.manager.init(client.user.id);
  client.user.setPresence({
    activities: [{ name: 'hyenas laughing', type: 'LISTENING' }],
    status: "online",
  });
});

client.on("raw", (d) => client.manager.updateVoiceState(d));

const { registerCommands, registerEvents } = require("./src/utils/register");
registerCommands(client, "../commands");
registerEvents(client, "../events");

client.login(process.env.BOT_TOKEN);
