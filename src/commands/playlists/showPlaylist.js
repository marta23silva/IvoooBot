const discord = require('discord.js');
const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');

module.exports = {
	run: async (tokens, message) => {
		if(!tokens[0]) {
			try {
				await connection.query(
					`SELECT name FROM Playlist WHERE guildId = '${message.guild.id}'`
				).then(result => {
					if(result[0].length == 0) {
						message.channel.send('You do not have playlists on this guild.');
					} else {
						let res = [];
						for(var i = 1; i <= result[0].length; i++) {
							const curr = {name: result[0][i-1].name};
							res.push(curr);
						}
						
						const text = res.map((object, index) => `${++index}) ${object.name}`);
						message.channel.send(
							new discord.MessageEmbed()
							.setTitle("✨PLAYLISTS✨")
							.setDescription(`\`\`\`\n${text.join(`\n`)}\n\`\`\``)
							.setColor('00ff00')
						);
					}
				});
			} catch(err) {
				console.error(err);
				message.channel.send('There was an error. Please check your console.');
				return;
			}
		} else {
			message.channel.send('Not yet implemented. Coming soon!');
		}
	},

	command: 'showplaylist'
}