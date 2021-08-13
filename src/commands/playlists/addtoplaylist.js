const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');
const StringModifier = require('../../utils/stringModifier');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		if(!tokens[0]) return message.channel.send(`You have to select a playlist! Please use '${prefix} addto <playlist name> - <song> - <artist>'.`);
		
		tokens.shift();	// get rid of the word 'playlist'
		const og_msg = StringModifier.saveOriginal(tokens);
		tokens = StringModifier.apostropheCheck(tokens);
		const msg = StringModifier.cutOutSpaces(tokens);
		if(msg.tokenCount !== 3) return message.channel.send(`Incorrect amount of arguments. Please use '${prefix} addto <playlist name> - <song> - <artist>'.`);

		// Check if playlist name exists, get the id if it does.
		let playlistIndex;
		let playlist_exists;
		await connection.query(
			`SELECT id FROM Playlist WHERE name = '${msg.playlist}' AND guildId = '${message.guild.id}'`
		).then(result => {
			playlistIndex = result[0][0].id;
			playlist_exists = true;
		}).catch(err => {
			message.channel.send(`You do not have a playlist with that name. Please create it first with '${prefix} createplaylist <playlist name>'`);
			playlist_exists = false;
		});

		if(playlist_exists) {
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
				message.channel.send(`${og_msg.song} by ${og_msg.artist} added to ${og_msg.playlist}`);
			}).catch(err => {
				message.channel.send('That song is already contained in that playlist, no need to add it.');
			});
		}
	},

	command: 'addto'
}