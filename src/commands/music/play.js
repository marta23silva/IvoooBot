const discord = require('discord.js');
const { client } = require('../../../bot');
const { msToHMS } = require('../../utils/time');
const { guildCmdPrefixes } = require('../../events/ready');
const { apostropheCheck } = require('../../utils/tokenAdjuster');
let connection = require('../../../database/db');

module.exports = {
	run: async (tokens, message) => {

		const prefix = guildCmdPrefixes.get(message.guild.id);
		let player = client.manager.players.get(message.guild.id);

		client.on("raw", (d) => client.manager.updateVoiceState(d));
		if(!player) {
			player = client.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
			});
			message.channel.send('https://tenor.com/view/boom-baby-kuzco-gif-22347025');
			player.connect();
		}

		if(!tokens[0] && (!player || !player.paused)) return message.channel.send(`Ivooo no understand 🤡 Please use '${prefix} play <url/song title>'`);
		if(!tokens[0] && player.paused) {
			player.pause(false);
			return message.react('▶️');
		}

		// Play or add playlist to the queue
		if(tokens[0] === 'playlist') {
			if(!tokens[1]) return message.channel.send(`Incorrect amount of arguments. Please use '${prefix} play playlist <playlist name>'.`);
			tokens.splice(0, 1);	// get rid of the word 'playlist'
			const og_playlist = tokens.join(' ');
			tokens = apostropheCheck(tokens);
			tokens = tokens.join(' ');
			
			let playlistIndex;
			await connection.query(
				`SELECT id FROM Playlist WHERE name = '${tokens}' AND guildId = '${message.guild.id}'`
			).then(result => {
				playlistIndex = result[0][0].id;
			}).catch(err => {
				message.channel.send("I can't play a playlist that doesn't exist...");
				message.channel.send('https://tenor.com/yfZN.gif');
				playlistIndex = -1;
			});

			if(playlistIndex > -1) {
				let songs = [];

				await connection.query(
					`SELECT Song.songTitle, Song.artist FROM Playlist_Songs INNER JOIN Song ON Playlist_Songs.songId = Song.id WHERE Playlist_Songs.playlistId = ${playlistIndex}`
				).then(result => {
					for(var i = 0; i < result[0].length; i++) {
						const curr = {song: result[0][i].songTitle, artist: result[0][i].artist};
						songs.push(curr);
					}
				}).catch(err => { console.error(err); });

				if(songs.length == 0) { return message.channel.send(`${og_playlist} is currently empty. Please add songs to the playlist first.`); }
				
				for(var i = 0; i < songs.length; i++) {
					const res = await client.manager.search(
						`${songs[i].song} by ${songs[i].artist}`,
						message.author
					);

					player.queue.add(res.tracks[0]);
					if(!player.playing && !player.paused && !player.queue.size) {
						player.play();
					}
				}

				message.channel.send(
					new discord.MessageEmbed()
					.setDescription('✅ Playlist added to queue!')
					.setColor('00ff00')
				);
			}
		
		// Play or add a single song to the queue
		} else {

			const res = await client.manager.search(
				tokens.join(' '),
				message.author
			);

			player.queue.add(res.tracks[0]);
			if(player.queue.size >= 1) {
				message.channel.send(
					new discord.MessageEmbed()
					.setTitle("✨SINGING NEXT✨: " + res.tracks[0].title)
					.addFields([
						{ inline: true, name: "Author", value: res.tracks[0].author },
						{ inline: true, name: "Length", value: msToHMS(res.tracks[0].duration)},
						{ inline: true, name: "Requester", value: res.tracks[0].requester }
					])
					.setColor("00ff00")
				);
			}

			if(!player.playing && !player.paused && !player.queue.size) {
				player.play();
			}
		}
	},

	command: 'play'
}