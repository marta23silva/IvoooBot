const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');
const { apostropheCheck } = require('../../utils/stringModifier');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		if(!tokens[0]) return message.channel.send(`You have to name the playlist! Please use '${prefix} createplaylist <playlist name>'`);
		
		const og_playlist = tokens.join(' ');
		let playlist = apostropheCheck(tokens);
		playlist = playlist.join(' ');
		console.log(playlist);

		await connection.query(
			`INSERT INTO Playlist(name, guildId) VALUES ('${playlist}','${message.guild.id}')`
		).then(() => {
			message.channel.send(`Created new playlist: ${og_playlist}`);
		}).catch(err => {
			console.error(err);
			message.channel.send('There is a playlist on your guild with that name already. Please choose a new one.');
		});
	},

	command: 'createplaylist'
}