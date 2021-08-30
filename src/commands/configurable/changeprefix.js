let connection = require('../../../database/db');
const { getPrefix } = require('../../utils/tokenAdjuster');
const { guildCmdPrefixes } = require('../../events/ready');
const embed = require('../../utils/messageEmbed');

module.exports = {
	run: async (tokens, message) => {
		const prefix = getPrefix(message);
		if(message.member.id !== message.guild.ownerID) return message.channel.send(embed.embed_yellow_warning('❗️ You do not have permission to use that command.'));
		if(!tokens[0]) return message.channel.send(embed.embed_green_info(`😃 **My prefix is ${prefix}**\nUse '${prefix}change-prefix [new prefix]' to update it!`));
		if(tokens[1]) return message.channel.send(embed.embed_yellow_warning('❗️ **Incorrect amount of arguments.**\nMy prefix needs to be of one word only.'));
		
		const newPrefix = tokens[0];
		await connection.query(
			`UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
		).then(() => {
			guildCmdPrefixes.set(message.guild.id, newPrefix);
			message.channel.send(embed.embed_green_info(`✅ Updated guild prefix to: ${newPrefix}`));			
		}).catch(err => { console.error(err); });
	},

	command: 'change-prefix'
}