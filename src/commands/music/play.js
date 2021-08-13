const discord = require('discord.js');
const { client } = require('../../../bot');
const { msToHMS } = require('../../utils/time');
const { guildCmdPrefixes } = require('../../events/ready');
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
			player.connect();
		}

		if(!tokens[0] && (!player || !player.paused)) return message.channel.send("Ivooo no understand 🤡 Please use 'ivooo play <url/song title>'");
		if(!tokens[0] && player.paused) {
			player.pause(false);
			return message.react('▶️');
		}

		// message.channel.send('tokens antes antes: ' + tokens);

		if(tokens[0] === 'playlist') {
			/* if(!tokens[1]) return message.channel.send(`Incorrect amount of arguments. Please use '${prefix} play playlist <playlist name>'.`);
			tokens.splice(0, 1); 			// get rid of the word 'playlist'
			tokens = tokens.join(' ');
			const position = tokens.indexOf("'");
			message.channel.send('tokens antes: ' + tokens);
			if(position > -1) {
				const apostrophe = "'";
				tokens = [tokens.slice(0, position), apostrophe, tokens.slice(position)].join('');
				message.channel.send('tokens depois: ' + tokens);
			}
			
			let playlistIndex;
			let playlist_exists;
			await connection.query(
				`SELECT id FROM Playlist WHERE name = '${tokens}' AND guildId = '${message.guild.id}'`
			).then(result => {
				playlistIndex = result[0][0].id;
				playlist_exists = true;
			}).catch(err => {
				message.channel.send("I can't play a playlist that doesn't exist...");
				message.channel.send('https://tenor.com/yfZN.gif');
				playlist_exists = false;
			});

			if(playlist_exists) {
				let songs_exist;
				await connection.query(
					`SELECT songId FROM Playlist_Songs WHERE playlistId = ${playlistIndex}`
				).then(result => {
					console.log(result[0]);
					songs_exist = true;
				}).catch(err => {
					message.channel.send(`${tokens} is currently empty. Please add songs to the playlist first.`);
					songs_exist = false;
				});

				if(songs_exist) {

				}
			} */
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