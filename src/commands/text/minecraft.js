const { SlashCommandBuilder } = require('@discordjs/builders');
const minecraft = require('minecraft-server-util');
const { MessageEmbed } = require('discord.js');

const SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = 25565 // default minecraft server port
let info, lastUpdated = 0;
const cacheTime = 15 * 1000;
const PLAYING = '{players} people are playing!';

function getStatus() {
	if (Date.now() < lastUpdated + cacheTime) return Promise.resolve(info);
	return minecraft.status(SERVER_ADDRESS, { port: SERVER_PORT })
		.then(response => {
			info = response;
			lastUpdated = Date.now();
			return info;
		})
}

module.exports = {

	data: new SlashCommandBuilder()
	.setName('minecraft')
	.setDescription('Shows Minecraft server status'),
	
	async execute(interaction, tokens) {
		
		if(!SERVER_ADDRESS) { return interaction.reply('I do not have an IP to check if your server is up. Please contact my owner 👀'); }

		const channel = interaction.client.channels.cache.get(interaction.channelId);
		interaction.reply('Checking if the server is up...');

		getStatus().then(data => {
			const PLAYERS_STATUS = data.onlinePlayers ? PLAYING.replace('{players}', data.onlinePlayers) : 'Nobody is playing.';
			const status = new MessageEmbed()
				.setColor('29dd00')
				.setAuthor({ 
					name: 'Minecraft server is online!',
					iconURL: 'https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png?width=530&height=530',
				})
				.setDescription(PLAYERS_STATUS)
				.setThumbnail('https://cdn.discordapp.com/attachments/868061485425893408/947279898429501480/12a0ed7c6bc09b73d6558c6f69ed7f5f.jpeg');
			return channel.send({ embeds: [ status ] });
		}).catch(err => {
			const status = new MessageEmbed()
				.setColor('e30808')
				.setAuthor({
					name: 'Minecraft server is offline!',
					iconURL: 'https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png?width=530&height=530',
				})
				.setThumbnail('https://cdn.discordapp.com/attachments/868061485425893408/947279898429501480/12a0ed7c6bc09b73d6558c6f69ed7f5f.jpeg');
			return channel.send({ embeds: [ status ] });
		})
	},
};