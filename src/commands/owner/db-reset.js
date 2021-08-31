const embed = require('../../utils/messageEmbed');
let connection = require('../../../database/db');

module.exports = {
	run: async (tokens, message) => {

		if(message.author != process.env.OWNER_ID) return message.channel.send(embed.embed_yellow_warning(`❗️ You don't have permission to use that command.`));
			
		let childRow, playlists, songs = true;
		await connection.query(
			`DELETE FROM Playlist_Songs`
		).then(() => { childRow = false; }
		).catch(err => { console.error(err); });

		// delete parent row if there is no child row
		if(!childRow) {
			await connection.query(
				`DELETE FROM Playlist`
			).then(() => { playlists = false; }
			).catch(err => { console.error(err); });

			await connection.query(
				`DELETE FROM Song`
			).then(() => { songs = false; }
			).catch(err => { console.error(err); });
		}

		if(!playlists && !songs) message.react('✅');

		await connection.query(
			`ALTER TABLE Playlist_Songs AUTO_INCREMENT = 1`
		).then(() => { console.log('AUTO_INCREMENT from Playlist_Songs reset to 1.') }
		).catch(err => { console.error(err); });

		await connection.query(
			`ALTER TABLE Playlist AUTO_INCREMENT = 1`
		).then(() => { console.log('AUTO_INCREMENT from Playlist reset to 1.') }
		).catch(err => { console.error(err); });

		await connection.query(
			`ALTER TABLE Song AUTO_INCREMENT = 1`
		).then(() => { console.log('AUTO_INCREMENT from Song reset to 1.') }
		).catch(err => { console.error(err); });
	},

	command: 'db-reset',

	aliases: ['db-delete']
}