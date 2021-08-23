const { guildCmdPrefixes } = require('../../events/ready');
let connection = require('../../../database/db');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		if(message.member.id !== message.guild.ownerID) return message.channel.send('You do not have permission to use that command.');
		if(!tokens[0]) return message.channel.send(`My prefix is ${prefix}. Use '${prefix} changeprefix <new prefix>' to update it!`);
		if(tokens[1]) return message.channel.send('Wrong number of arguments. My prefix needs to be of one word only.');
		
		const newPrefix = tokens[0];
		try {
			await connection.query(
				`UPDATE GuildConfigurable SET cmdPrefix = '${newPrefix}' WHERE guildId = '${message.guild.id}'`
			);
			guildCmdPrefixes.set(message.guild.id, newPrefix);
			message.channel.send(`Updated guild prefix to: ${newPrefix}`);
			message.react('✅');
		} catch(err) {
			console.error(err);
			message.channel.send('MySQL error. Check console.');
			return;
		}
	},

	command: 'change-prefix'
}