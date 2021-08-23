const { MessageEmbed } = require('discord.js');
const { guildCmdPrefixes } = require('../../events/ready');

module.exports = {
	run: async (tokens, message) => {
		const prefix = guildCmdPrefixes.get(message.guild.id);
		
		const helpMenu = new MessageEmbed()
			.setColor('00ff00')
			.setAuthor('Ivooo Commands', 'https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png')
			.setThumbnail('https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png')
			.addFields(
				{ name: 'Text', value: `\`${prefix} help text\``, inline: true },
				{ name: 'Music', value: `\`${prefix} help music\``, inline: true },
				{ name: 'Playlist', value: `\`${prefix} help playlist\``, inline: true},
				{ name: 'Configurable', value: `\`${prefix} help config\``, inline: true}
			);

		if(!tokens[0]) return message.channel.send(helpMenu);
		
		if(tokens[0] === 'text') {
			message.channel.send(
				new MessageEmbed()
				.setColor('00ff00')
				.setTitle('Text Commands')
				.addFields(
					{ name: `\`${prefix}\``, value: 'Ivooo replies with a random message.' },
					{ name: `\u200B\n\`${prefix} gif [optional search]\``, value: 'Sends a random gif or one related with the search, if specified.' },
					{ name: `\u200B\n\`${prefix} dumb\``, value: 'Ivooo being dumb.' },
					{ name: `\u200B\n\`${prefix} good [job/bot]\``, value: 'Ivooo behaves and is happy.' },
					{ name: `\u200B\n\`${prefix} say [hello/happy birthday]\``, value: 'Says hello or wishes a happy birthday.' }
				)
			);
		} else if(tokens[0] === 'music') {
			message.channel.send(
				new MessageEmbed()
				.setColor('00ff00')
				.setTitle('Music Commands')
				.addFields(
					{ name: `\`${prefix} entra\``, value: 'Joins the voice channel.' },
					{ name: `\u200B\n\`${prefix} play [song/url]\``, value: 'Plays the song if the queue is empty; adds it otherwise.' },
					{ name: `\u200B\n\`${prefix} play playlist [playlist name]\``, value: 'Adds the whole playlist to the queue.' },
					{ name: `\u200B\n\`${prefix} pause\``, value: 'Pauses the song.' },
					{ name: `\u200B\n\`${prefix} stop\``, value: 'Stops the song and clears the queue.' },
					{ name: `\u200B\n\`${prefix} skip\``, value: 'Skips to the next song.' },
					{ name: `\u200B\n\`${prefix} queue\``, value: 'Displays the queue.' },
					{ name: `\u200B\n\`${prefix} sai\``, value: 'Leaves the voice channel.' }

				)
			);
		} else if(tokens[0] === 'playlist') {
			message.channel.send(
				new MessageEmbed()
				.setColor('00ff00')
				.setTitle('Playlist Commands')
				.addFields(
					{ name: `\`${prefix} create-playlist [name]\``, value: 'Creates a new playlist.' },
					{ name: `\u200B\n\`${prefix} addto [playlist] - [song] - [artist]\``, value: 'Adds the song to the specified playlist.' },
					{ name: `\u200B\n\`${prefix} change-name of [old name] to [new name]\``, value: 'Changes the name of the playlist.' },
					{ name: `\u200B\n\`${prefix} show-playlist [optional playlist name]\``, value: 'Shows a list of all playlists or the songs in the playlist, if given.' },
					{ name: `\u200B\n\`${prefix} remove [playlist]\``, value: 'Deletes a playlist.' },
					{ name: `\u200B\n\`${prefix} remove from [playlist] - [song] - [artist]\``, value: 'Removes the song from the playlist.' }
				)
			);
		} else if(tokens[0] === 'config') {
			message.channel.send(
				new MessageEmbed()
				.setColor('00ff00')
				.setTitle('Configurable Commands')
				.addFields(
					{ name: `\`${prefix} change-prefix [new prefix]\``, value: 'Sets a new prefix for the guild (only usable by the guild owner).' }
				)
			);
		} else {
			message.channel.send(
				new MessageEmbed()
				.setDescription('❌ Command not found.')
				.setColor('00ff00')
			);
		}
	},

	command: 'help'
}