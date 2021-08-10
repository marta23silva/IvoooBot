const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		if(!tokens[0]) return message.channel.send(`You have to name the playlist! Please use '${prefix} createplaylist <playlist name>'`);
		
		const playlistName = tokens.join(' ');
		try {
			await connection.query(
				`INSERT INTO Playlist(name, guildId) VALUES ('${playlistName}','${message.guild.id}')`
			);
			message.channel.send(`Created new playlist: ${playlistName}`);
		} catch(err) {
			// console.error(err);
			message.channel.send('There is a playlist on your guild with that name already. Please choose a new one.');
			return;
		}
	},

	command: 'createplaylist'
}