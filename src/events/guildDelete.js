const { client } = require('../../bot');
let connection = require('../../database/db');

module.exports = {
	run: async (guild) => {

		await connection.query(
			`DELETE FROM Guild WHERE guildId = ${guild.id}`
		).then(() => {
			console.log(`Ivooo was kicked from ${guild.id}.`);
		}).catch(err => {
			console.error(err);
		});

		await connection.query(
			`DELETE FROM GuildConfigurable WHERE guildId = ${guild.id}`
		).then(() => {
			console.log('All guild info was deleted.');
		}).catch(err => {
			console.error(err);
		});

		let ids = [];
		await connection.query(
			`SELECT id FROM Playlist WHERE guildId = ${guild.id}`
		).then(result => {
			console.log(result[0]);
			for(var i = 0; i < result[0].length; i++) ids[i] = result[0][i].id;
		}).catch(err => {
			console.error(err);
		});

		let playlistsEmpty = false;
		// if there's playlist on the guild
		if(ids[0]) {
			for(var i = 0; i < ids.length; i++) {
				const id = ids[i];
				connection.query(
					`DELETE FROM Playlist_Songs WHERE playlistId = ${id}`
				).then(() => {
					console.log(`Songs from playlist ${id} were deleted.`);
				}).catch(err => { console.error(`Couldn't delete songs from playlist ${id}: ` + err); });
			}
			playlistsEmpty = true;
		}

		// if all playlists are now empty
		if(playlistsEmpty) {
			for(var i = 0; i < ids.length; i++) {
				const id = ids[i];
				connection.query(
					`DELETE FROM Playlist WHERE id = ${id}`
				).then(() => { console.log(`Playlist ${id} was deleted.`);
				}).catch(err => { console.error(`Couldn't delete playlist ${id}: ` + err); });
			}
		}
	},

	eventName: 'guildDelete'
}