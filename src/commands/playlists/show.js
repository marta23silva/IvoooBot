const discord = require('discord.js');
let connection = require('../../../database/db');
const { apostropheCheck, getPrefix } = require('../../utils/tokenAdjuster');
const embed = require('../../utils/messageEmbed');

module.exports = {
	run: async (tokens, message) => {
		
		if(!tokens[0]) {
			await connection.query(
				`SELECT name FROM Playlist WHERE guildId = ${message.guild.id}`
			).then(result => {
				if(result[0].length == 0) return message.channel.send(embed.embed_green_info('No playlists on this guild.'));

				let res = [];
				for(var i = 1; i <= result[0].length; i++) {
					const curr = {name: result[0][i-1].name};
					res.push(curr);
				}
				let index = 0;
				const indexes = res.map(() => `${++index}.`);
				const playlistNames = res.map((object) => `${object.name}`);
				return message.channel.send(embed.embed_green_show('Playlists', indexes, playlistNames));
			}).catch(err => {
				console.error(err);
				message.channel.send('There was an error. Please blame ✨the developer✨');
			});
		} else {

			const og_playlist = tokens.join(' ');
			let playlist = apostropheCheck(tokens);
			playlist = playlist.join(' ');

			let playlistIndex;
			await connection.query(
				`SELECT id FROM Playlist WHERE name = '${playlist}' AND guildId = ${message.guild.id}`
			).then(result => {
				playlistIndex = result[0][0].id;
			}).catch(err => {
				playlistIndex = -1;
				message.channel.send(embed.embed_red_error(`❌ Playlist '${og_playlist}' does not exist.`));
			});

			if(playlistIndex > -1) {

				let songInfo = [];
				await connection.query(
					`SELECT * FROM Song INNER JOIN Playlist_Songs ON Song.id = Playlist_Songs.songId AND Playlist_Songs.playlistId = ${playlistIndex}`
				).then(result => {

					if(result[0].length == 0) return message.channel.send(embed.embed_green_info('Empty playlist.'));

					for(var i = 0; i < result[0].length; i++) {
						const curr = {title: result[0][i].songTitle, artist: result[0][i].artist}; 
						songInfo.push(curr);
					}
					let index = 0;
					const indexes = songInfo.map(() => `${++index}.`);
					const text = songInfo.map((object) => `${object.title} by ${object.artist}`);

					message.channel.send(embed.embed_green_show(`Playlist: ${og_playlist}`, indexes, text));

				}).catch(err => { console.error(err); });
			}
		}
	},

	command: 'show-playlist',

	aliases: ['sp','show-playlists', 'playlist-show', 'playlists-show']
}