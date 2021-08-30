let connection = require('../../../database/db');
const { apostropheCheck, getPrefix } = require('../../utils/tokenAdjuster');
const embed = require('../../utils/messageEmbed');

module.exports = {
	run: async (tokens, message) => {
		
		const prefix = getPrefix(message);
		if(!tokens[0]) return message.channel.send(embed.embed_yellow_warning(`❗️ **Incorrect amount of arguments.**\nUse \`${prefix}create-playlist [playlist]\` to create a playlist.`));
		if(tokens[0].includes('-')) return message.channel.send(embed.embed_red_error(`❌ **Invalid character : —**\nPlease choose another name.`));
		
		const og_playlist = tokens.join(' ');
		const playlist = apostropheCheck(tokens).join(' ');

		await connection.query(
			`INSERT INTO Playlist(name, guildId) VALUES ('${playlist}','${message.guild.id}')`
		).then(() => {
			message.channel.send(embed.embed_green_info(`✅ Created new playlist: ${og_playlist}`));
		}).catch(err => {
			message.channel.send(embed.embed_red_error('❌ **Duplicated name.**\nPlease choose a new one.'));
		});
	},

	command: 'create-playlist'
}