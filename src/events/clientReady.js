import { Events, ActivityType } from 'discord.js';
import { config } from '../config/envLoader.js';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {

    client.user.setPresence({
      activities: [{ name: config.discordStatus, type: ActivityType.Listening }],
      status: `${ config.botStatus }`,
    });

		console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
    console.log("Hello! 🖤");
	},
};