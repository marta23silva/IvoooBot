const discord = require('discord.js');
let connection = require('../../../database/db');
const adjuster = require('../../utils/tokenAdjuster');
const embed = require('../../utils/messageEmbed');

module.exports = {
	command: {
		name: 'delete',
		category: 'Playlist',
		description: 'Deletes a playlist.',
		aliases: ['del'],
		usage: 'delete [playlist]'
	},

	run: async (tokens, message) => {

		const prefix = adjuster.getPrefix(message);
		if(!tokens[0]) return message.channel.send(embed.embed_yellow_warning(`❗️ **Incorrect amount of arguments.**\nUse \`${prefix}delete [playlist]\` to delete a playlist \n--------------- OR ---------------\n \`${prefix}delete from [playlist] - [song] - [artist]\` to delete a song.`));

		// delete a song from a playlist
		if(tokens[0] === 'from') {

			tokens.shift();	// get rid of the word 'from'
			const og_msg = adjuster.cutOutSpaces(tokens);
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
				songIndex = -1;
				playlistIndex = -1;
				message.channel.send(embed.red_error(`❌ ${og_msg.song} by ${og_msg.artist} does not exist in ${og_msg.playlist}.`));
			});

			if(songIndex > -1 && playlistIndex > -1) {
				await connection.query(
					`DELETE FROM Playlist_Songs WHERE songId = ${songIndex} AND playlistId = ${playlistIndex}`
				).then(() => {
					message.channel.send(embed.embed_green_info(`✅ ${og_msg.song} by ${og_msg.artist} was deleted from ${og_msg.playlist}.`));
				}).catch(err => { console.error(err); });
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
				message.channel.send(embed.red_error(`❌ Playlist '${og_playlist}' does not exist.`));
			});

			if(playlistIndex > -1) {
				await connection.query(
					`DELETE FROM Playlist_Songs WHERE playlistId = ${playlistIndex}`
				).catch(err => {});

				await connection.query(
					`DELETE FROM Playlist WHERE id = ${playlistIndex}`
				).then(() => {
					message.channel.send(embed.embed_green_info(`✅ Playlist '${og_playlist}' was deleted.`));
				}).catch(err => { console.error(err); });
			}
		}
	}
}