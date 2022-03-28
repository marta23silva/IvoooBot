const { MessageEmbed } = require('discord.js');
const IvoooTheIcon = 'https://raw.githubusercontent.com/marta23silva/IvoooBot/discordjs-update-v13/images/Banzai.png';
const minecraftThumb = 'https://raw.githubusercontent.com/marta23silva/IvoooBot/discordjs-update-v13/images/Minecraft.jpeg';

function error_msg(message) {
	return new MessageEmbed()
		.setColor('e30808')
		.setAuthor({
			name: `${message}`,
			iconURL: `${IvoooTheIcon}`,
		});
}

function warning_msg(message) {
	return new MessageEmbed()
		.setColor('#FFFF00')
		.setAuthor({
			name: `${message}`,
			iconURL: `${IvoooTheIcon}`,
		});
}

function success_msg(message) {
	return new MessageEmbed()
		.setColor('29dd00')
		.setAuthor({
			name: `${message}`,
			iconURL: `${IvoooTheIcon}`,
		})
}

function minecraftServerStatus_msg(color, message, description) {
	return new MessageEmbed()
		.setColor(color)
		.setAuthor({ 
			name: `${message}`,
			iconURL: `${IvoooTheIcon}`,
		})
		.setDescription(description)
		.setThumbnail(minecraftThumb);
}

function custom_msg(color, title, description) {
	return new MessageEmbed()
		.setColor(color)
		.setTitle(title)
		.setDescription(description)
		.setTimestamp();
}

module.exports = { error_msg, warning_msg, success_msg, minecraftServerStatus_msg, custom_msg };