const { MessageEmbed } = require('discord.js');

function error_msg(message) {
	return new MessageEmbed()
		.setColor('e30808')
		.setAuthor({
			name: `${message}`,
			iconURL: 'https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png?width=530&height=530',
		});
}

function custom_msg(color, title, description) {
	return new MessageEmbed()
		.setColor(color)
		.setTitle(title)
		.setDescription(description)
		.setTimestamp();
}

module.exports = { error_msg, custom_msg };