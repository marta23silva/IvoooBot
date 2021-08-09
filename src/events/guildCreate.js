const { client } = require('../../bot');
let connection = require('../../database/db');

module.exports = {
	run: async (guild) => {
		try {
			// console.log(connection);
			await connection.query(
				`INSERT INTO Guild VALUES('${guild.id}', '${guild.ownerID}')`
			);
			await connection.query(
				`INSERT INTO GuildConfigurable (guildId) VALUES ('${guild.id}')`
			);
		} catch(err) {
			console.error(`Error inserting guild into database:`, err);
		}
	},

	eventName: 'guildCreate'
}