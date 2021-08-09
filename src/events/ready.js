const { client } = require('../../bot');
const guildCmdPrefixes = new Map();
let connection = require('../../database/db');

module.exports = {
	run: () => {
		console.log('Hello! 🖤');
		client.manager.init(client.user.id);
		// OPTIONS: PLAYING, WATCHING, STREAMING, LISTENING
		client.user.setActivity('hyenas laughing', { type: 'LISTENING' });

		client.guilds.cache.forEach(guild => {
			connection.query(
				`SELECT cmdPrefix FROM GuildConfigurable WHERE guildId = '${guild.id}'`
			).then(result => {
				guildCmdPrefixes.set(guild.id, result[0][0].cmdPrefix);
			}).catch(err => console.error(err));
		});
	},

	eventName: 'ready',

	guildCmdPrefixes
}