const { SlashCommandBuilder } = require('@discordjs/builders');
const minecraft = require('minecraft-server-util');
const { minecraftServerStatus_msg, warning_msg } = require('../../utils/embeds');

let SERVER_ADDRESS = process.env.SERVER_ADDRESS;
const SERVER_PORT = 25565 // default minecraft server port
let info, lastUpdated = 0;
const cacheTime = 15 * 1000;
const PLAYING = '{players} people are playing!';

const no_ip = warning_msg(`Please specify a server IP address.`);

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
	.setDescription('Shows Minecraft server status.')
	.addStringOption(option => option.setName('address').setDescription('IP address of your server')),

	aliases: [],
	
	async execute(interaction, tokens) {

		let address = '';
		
		if(!SERVER_ADDRESS) {
			// Get IP specified by the user
			address = interaction.options.getString('address');
			if(address) { SERVER_ADDRESS = address; }
			// No IP to check for
			if(!interaction.options || !address) { return interaction.reply({ embeds: [ no_ip ] }) }
		}

		const channel = interaction.client.channels.cache.get(interaction.channelId);
		interaction.reply('Checking if the server is up...');

		getStatus().then(data => {
			const PLAYERS_STATUS = data.onlinePlayers ? PLAYING.replace('{players}', data.onlinePlayers) : 'Nobody is playing.';
			const status = minecraftServerStatus_msg('29dd00', 'Minecraft server is online!', PLAYERS_STATUS);
			return channel.send({ embeds: [ status ] });
		}).catch(err => {
			const status = minecraftServerStatus_msg('e30808', 'Minecraft server is offline!', '');
			return channel.send({ embeds: [ status ] });
		})
	},
};