const discord = require('discord.js');
const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');
const adjuster = require('../../utils/tokenAdjuster');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		if(!tokens[0]) return message.channel.send(`Use '${prefix} change-name of <old name> to <new name>' to change a playlist name.`);

		tokens.shift();	// get rid of the word 'of'
		const og_tokens = tokens.join(' ').split('to');
		if(og_tokens[1].includes('-')) return message.channel.send(`Invalid character: - \nPlease choose another name.`);

		tokens = adjuster.apostropheCheck(tokens);
		tokens = tokens.join(' ').split('to');
		let old_name = tokens[0].substring(0,tokens[0].length-1);
		const new_name = tokens[1].substring(1,tokens[1].length);

		let playlistIndex;
		await connection.query(
			`SELECT id FROM Playlist WHERE name = '${old_name}' AND guildId = ${message.guild.id}`
		).then(result => {
			playlistIndex = result[0][0].id;
		}).catch(err => {
			console.error(err);
			playlistIndex = -1;
			message.channel.send(`Playlist ${og_tokens[0]} does not exist.`);
		});

		if(playlistIndex > -1) {
			await connection.query(
				`UPDATE Playlist SET name = '${new_name}' WHERE id = ${playlistIndex}`
			).then(() => {
				message.channel.send(`Playlist previously named ${og_tokens[0]} is now ${og_tokens[1]}`);
			}).catch(err => {
				console.error(err);
			});
		}
	},

	command: 'change-name'
}