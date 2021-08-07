const { Manager } = require('erela.js');
const { msToHMS } = require('../utils');
const discord = require('discord.js');

module.exports = function (client) {
	return new Manager({
		nodes: [
			{
				host: process.env.LAVALINK_HOST,
				port: 2333,
				password: process.env.LAVALINK_PASSWORD,
			},
		],
		send(id, payload)  {
			const guild = client.guilds.cache.get(id);
			if(guild) guild.shard.send(payload);
		},
	})
	.on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
	.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
	.on("trackStart", (player, track) => {
		if(track.title !== 'welcome' && track.title !== 'byebye') {
			client.channels.cache.get(player.textChannel).send(
				new discord.MessageEmbed()
					.setTitle("✨NOW PLAYING✨: " + track.title)
					.addFields([
						{ inline: true, name: "Author", value: track.author },
						{ inline: true, name: "Length", value: msToHMS(track.duration)},
						{ inline: true, name: "Requester", value: track.requester }
					])
					.setColor("00ff00")
			);
		}
	/* })
	.on("queueEnd", (player) => {
		client.channels.cache.get(player.textChannel).send("Adiós, falsidades.");
		player.destroy(); */
	});
}