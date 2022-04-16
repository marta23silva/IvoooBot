const { SlashCommandBuilder } = require('@discordjs/builders');
const { verifyChannel } = require('../../utils/utils');

module.exports = {

	data: new SlashCommandBuilder()
	.setName('lofi-girl')
	.setDescription(`Plays the lofi girl live playlist.`),

	aliases: [],

	async execute(interaction, tokens) {

		const client = interaction.client;
		let player = client.manager.players.get(interaction.guild.id);
		if(verifyChannel(interaction, player)) return;
		if(!player) {
			player = client.manager.create({
				guild: interaction.guild.id,
				voiceChannel: interaction.member.voice.channel.id,
				textChannel: interaction.channel.id,
			});
			player.connect();
		} else {
			player.queue.clear();
			player.stop();
		}

		const res = await client.manager.search(
			'https://www.youtube.com/watch?v=5qap5aO4i9A',
			interaction.author
		);

		if(res.loadType !== 'NO_MATCHES') {
			player.queue.add(res.tracks[0]);
			player.play();
		}
		await interaction.reply('<:lofigirl:964088883857985539>');
	},
};