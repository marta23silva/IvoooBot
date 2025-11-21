import { Client, GatewayIntentBits, Collection } from 'discord.js';
import { config } from './config/env.js';
import { eventLoader, registerCommands } from './utils/index.js';

const client = new Client({ intents: [ GatewayIntentBits.Guilds ] });
client.commands = new Collection();
eventLoader(client);
registerCommands(client);

client.login(config.botToken);