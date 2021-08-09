const { client } = require('../../bot');
let connection = require('../../database/db');

module.exports = {
	run: async (guild) => {
		try {
			// console.log(connection);
			await connection.query(
				`DELETE FROM Guild WHERE guildId = '${guild.id}'`
			);
			await connection.query(
				`DELETE FROM GuildConfigurable WHERE guildId = '${guild.id}'`
			);
		} catch(err) {
			console.error(`Error deleting guild from database:`, err);
		}
	},

	eventName: 'guildDelete'
}