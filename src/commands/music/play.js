const discord = require('discord.js');
const { client } = require('../../../bot');
const { msToHMS } = require('../../utils');

module.exports = {
	run: async (tokens, message) => {

		let player = client.manager.players.get(message.guild.id);

		if(!tokens[0] && (!player || !player.paused)) return message.channel.send("Ivooo no understand 🤡 Please use 'ivooo play <url/song title>'");
		if(!tokens[0] && player.paused) {
			player.pause(false);
			message.react('▶️');
			return;
		}

		client.on("raw", (d) => client.manager.updateVoiceState(d));

		const res = await client.manager.search(
			tokens.join(' '),
			message.author
		);

		if(!player) {
			player = client.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
			});
			player.connect();
		}
		
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
	},

	command: 'play'
}