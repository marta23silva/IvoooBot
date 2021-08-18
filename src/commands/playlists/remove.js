const discord = require('discord.js');
const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');
const adjuster = require('../../utils/tokenAdjuster');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		if(!tokens[0]) return message.channel.send(`Please use '${prefix} remove <playlist>' to remove a playlist\nOR\n'${prefix} remove from <playlist> - <song> - <artist>' to remove a song from a playlist.`);

		// remove a song
		if(tokens[0] === 'from') {

			tokens.shift();	// get rid of the word 'from'
			const og_msg = adjuster.saveOriginal(tokens);
			tokens = adjuster.apostropheCheck(tokens);
			const msg = adjuster.cutOutSpaces(tokens);

			let songIndex;
			let playlistIndex;
			await connection.query(
				`SELECT Song.id AS idS, Playlist.id AS idP FROM Song, Playlist WHERE Song.songTitle = '${msg.song}' AND Song.artist = '${msg.artist}' AND Playlist.name = '${msg.playlist}' AND Playlist.guildId = ${message.guild.id}`
			).then(result => {
				songIndex = result[0][0].idS;
				playlistIndex = result[0][0].idP;
			}).catch(err => {
				console.error(err);
				songIndex = -1;
				playlistIndex = -1;
				message.channel.send(`${og_msg.song} by ${og_msg.artist} does not exist on ${og_msg.playlist}.`);
			});

			if(songIndex > -1 && playlistIndex > -1) {
				await connection.query(
					`DELETE FROM Playlist_Songs WHERE songId = ${songIndex} AND playlistId = ${playlistIndex}`
				).then(() => {
					message.channel.send(`${og_msg.song} by ${og_msg.artist} removed from ${og_msg.playlist}.`);
				}).catch(err => {
					console.error(err);
				});
			}

		// remove a playlist
		} else {
			const og_playlist = tokens.join(' ');
			tokens = adjuster.apostropheCheck(tokens);
			const playlist = tokens.join(' ');

			let playlistIndex;
			await connection.query(
				`SELECT id FROM Playlist WHERE name = '${playlist}' AND guildId = '${message.guild.id}'`
			).then(result => {
				playlistIndex = result[0][0].id;
			}).catch(err => {
				playlistIndex = -1;
				message.channel.send(`Playlist ${og_playlist} does not exist.`);
				console.error(err);
			});

			if(playlistIndex > -1) {
				await connection.query(
					`DELETE FROM Playlist_Songs WHERE playlistId = ${playlistIndex}`
				).catch(err => {
					console.error(err);
				});

				await connection.query(
					`DELETE FROM Playlist WHERE id = ${playlistIndex}`
				).then(() => {
					message.channel.send(`Playlist ${og_playlist} was removed.`);
				}).catch(err => {
					console.error(err);
				});
			}
		}
	},

	command: 'remove'
}