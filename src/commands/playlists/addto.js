let connection = require('../../../database/db');
const adjuster = require('../../utils/tokenAdjuster');
const { getPrefix } = require('../../utils/tokenAdjuster');
const embed = require('../../utils/messageEmbed');

module.exports = {
	command: {
		name: 'addto',
		category: 'Playlist',
		description: 'Adds the song to the specified playlist.',
		aliases: [],
		usage: 'addto [playlist] - [song] - [artist]'
	},

	run: async (tokens, message) => {

		const prefix = getPrefix(message);
		if(!tokens[0] || adjuster.tokenCounter(tokens) !== 3) return message.channel.send(embed.embed_yellow_warning(`❗️ **Incorrect amount of arguments.**\nPlease use \`${prefix}addto [playlist] - [song] - [artist]\` to add a song to the playlist.`));
		
		const og_msg = adjuster.cutOutSpaces(tokens);
		tokens = adjuster.apostropheCheck(tokens);
		const msg = adjuster.cutOutSpaces(tokens);

		// Check if playlist name exists, get the id if it does.
		let playlistIndex;
		await connection.query(
			`SELECT id FROM Playlist WHERE name = '${msg.playlist}' AND guildId = '${message.guild.id}'`
		).then(result => {
			playlistIndex = result[0][0].id;
		}).catch(err => {
			playlistIndex = -1;
			message.channel.send(embed.embed_yellow_warning(`❗️ **You do not have a playlist with that name.**\nYou can create it using \`${prefix}create-playlist [playlist]\``));
		});

		if(playlistIndex > -1) {

			// Save song into database if it doesn't exist yet
			await connection.query(
				`INSERT INTO Song(songTitle, artist) VALUES ('${msg.song}','${msg.artist}')`
			).catch(err => {});

			// Get the song id
			let songIndex;
			await connection.query(
				`SELECT id FROM Song WHERE songTitle = '${msg.song}' AND artist = '${msg.artist}'`
			).then(result => {
				songIndex = result[0][0].id;
			}).catch(err => {});

			// Add song to playlist
			await connection.query(
				`INSERT INTO Playlist_Songs(playlistId, songId) VALUES ('${playlistIndex}','${songIndex}')`
			).then(() => {
				message.channel.send(embed.embed_green_info(`✅ ${og_msg.song} by ${og_msg.artist} added to ${og_msg.playlist}`));
			}).catch(err => {
				message.channel.send(embed.embed_red_error(`❌ The song '${og_msg.song}' is already in your '${og_msg.playlist}' playlist.`));
			});
		}
	}
}