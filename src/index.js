const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

console.clear();

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
    ],
    partials: ['MESSAGE', 'CHANNEL']
});

require('./util/eventLoader')(client);
client.commands = new Collection();
client.manager = require("./util/erelaManager")(client);
client.on("raw", (d) => client.manager.updateVoiceState(d));
client.login(process.env.TOKEN);