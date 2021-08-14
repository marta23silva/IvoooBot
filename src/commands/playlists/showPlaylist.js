const discord = require('discord.js');
const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');
const { apostropheCheck } = require('../../utils/stringModifier');

module.exports = {
	run: async (tokens, message) => {
		
		if(!tokens[0]) {
			await connection.query(
				`SELECT name FROM Playlist WHERE guildId = '${message.guild.id}'`
			).then(result => {
				let text;
				if(result[0].length == 0) {
					text = ['No playlists on this guild.'];
				} else {
					let res = [];
					for(var i = 1; i <= result[0].length; i++) {
						const curr = {name: result[0][i-1].name};
						res.push(curr);
					}
					text = res.map((object, index) => `${++index}) ${object.name}`);
				}
				message.channel.send(
					new discord.MessageEmbed()
					.setTitle("✨PLAYLISTS✨")
					.setDescription(`\`\`\`\n${text.join(`\n`)}\n\`\`\``)
					.setColor('00ff00')
				);
			}).catch(err => {
				console.error(err);
				message.channel.send('There was an error. Please check your console.');
			});
		} else {
			const og_playlist = tokens.join(' ');
			let playlist = apostropheCheck(tokens);
			playlist = playlist.join(' ');
			let playlistIndex;
			await connection.query(
				`SELECT id FROM Playlist WHERE name = '${playlist}' AND guildId = '${message.guild.id}'`
			).then(result => {
				playlistIndex = result[0][0].id;
			}).catch(err => {
				console.error(err);
				message.channel.send('No playlist on your guild with that name.');
				playlistIndex = -1;
			});

			if(playlistIndex > -1) {

				let songInfo = [];
				await connection.query(
					`SELECT * FROM Song INNER JOIN Playlist_Songs ON Song.id = Playlist_Songs.songId AND Playlist_Songs.playlistId = ${playlistIndex}`
				).then(result => {
					console.log(result[0]);
					for(var i = 0; i < result[0].length; i++) {
						const curr = {title: result[0][i].songTitle, artist: result[0][i].artist}; 
						songInfo.push(curr);
					}

					let text;
					if(songInfo.length == 0) {
						text = ['Empty playlist.'];
					} else {
						text = songInfo.map((object, index) => `${++index}) ${object.title} by ${object.artist}`);
					}

					message.channel.send(
						new discord.MessageEmbed()
						.setTitle(`✨${og_playlist}✨`)
						.setDescription(`\`\`\`\n${text.join(`\n`)}\n\`\`\``)
						.setColor('00ff00')
					);
				}).catch(err => { console.error(err); });
			}
		}
	},

	command: 'showplaylist'
}