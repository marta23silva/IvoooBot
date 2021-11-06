const { MessageEmbed } = require('discord.js');

module.exports = {
	embed_green_info: (description) => {
		return new MessageEmbed()
		.setDescription(description)
		.setColor('00ff00');
	},

	red_error: (description) => {
		return new MessageEmbed()
		.setDescription(description)
		.setColor('#E74C3C');
	},

	embed_yellow_warning: (description) => {
		return new MessageEmbed()
		.setDescription(description)
		.setColor('#FFFF00');
	},

	embed_green_show: (title, indexes, text) => {
		return new MessageEmbed()
		.setTitle(title)
		.addFields(
			{ name: '#', value: `${indexes.join(`\n`)}`, inline: true },
			{ name: 'Name', value: `${text.join(`\n`)}`, inline: true }
		)
		.setColor('00ff00');
	}
}