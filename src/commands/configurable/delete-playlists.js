let connection = require('../../../database/db');
const { getPrefix } = require('../../utils/tokenAdjuster');
const embed = require('../../utils/messageEmbed');

module.exports = {
	run: async (tokens, message) => {

		const prefix = getPrefix(message);
		if(message.member.id !== message.guild.ownerID) return message.channel.send(embed.embed_yellow_warning('❗️ You do not have permission to use that command.'));

		let ids = [];
		await connection.query(
			`SELECT id FROM Playlist WHERE guildId = ${message.guild.id}`
		).then(result => {
			for(var i = 0; i < result[0].length; i++) ids[i] = result[0][i].id;
		}).catch(err => { console.error(err); });

		if(!ids[0]) return message.channel.send(embed.embed_yellow_warning(`❗️ You currently don't have any playlists.`));

		let playlistsEmpty = false;
		for(var i = 0; i < ids.length; i++) {
			const id = ids[i];
			connection.query(
				`DELETE FROM Playlist_Songs WHERE playlistId = ${id}`
			).then(() => { console.log(`Songs from playlist ${id} were deleted.`); }
			).catch(err => { console.error(`Couldn't delete songs from playlist ${id}: ` + err); });
		}
		playlistsEmpty = true;

		// if all playlists are now empty
		if(playlistsEmpty) {
			for(var i = 0; i < ids.length; i++) {
				const id = ids[i];
				connection.query(
					`DELETE FROM Playlist WHERE id = ${id}`
				).then(() => { console.log(`Playlist ${id} was deleted.`); }
				).catch(err => { console.error(`Couldn't delete playlist ${id}: ` + err); });
			}
		}

		message.channel.send(embed.embed_green_info(`✅ All playlists were deleted.`));
	},

	command: 'delete-playlists',

	aliases: ['del-playlists', 'rmv-playlists']
}