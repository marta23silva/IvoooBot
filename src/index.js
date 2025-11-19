import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { config } from './config/envLoader.js';
import { eventLoader } from './utils/index.js';

const client = new Client({ intents: [ GatewayIntentBits.Guilds ] });
client.commands = new Collection();
eventLoader(client);

client.login(config.botToken);