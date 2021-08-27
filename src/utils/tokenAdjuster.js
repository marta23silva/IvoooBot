const { guildCmdPrefixes } = require('../events/ready');
const separator = '-';
const apostrophe = "'";

module.exports = {
	// saves the original input in an object
	saveOriginal: (tokens) => {
		tokens = tokens.join(' ');
		tokens = tokens.split(separator);
		return {playlist: tokens[0], song: tokens[1], artist: tokens[2]};
	},

	// adds apostrophes to ones already existing so it can be put into SQL
	apostropheCheck: (tokens) => {
		let msg = tokens.join(' ');
		if(msg.charAt(0) === apostrophe) msg = apostrophe + msg;
		for(var i = 1; i < msg.length-1; i++) {
			if(msg.charAt(i) === apostrophe && msg.charAt(i-1) !== apostrophe) msg = msg.substring(0, i) + apostrophe + msg.substring(i, msg.length);
		}
		if(msg.charAt(msg.length-1) === apostrophe) msg = msg + apostrophe;
		return msg.split(' ');
	},

	// cuts out possible spaces that can happen before and after a string
	cutOutSpaces: (tokens) => {
		const msg = tokens.join(' ');
		tokens = msg.split(separator);

		let _playlist = tokens[0];
		let _song = tokens[1];
		let _artist = tokens[2];

		if(_playlist.charAt(_playlist.length-1) === ' ') _playlist = _playlist.slice(0, _playlist.length-1);
		if(_song.charAt(_song.length-1) === ' ' && _song.charAt(0) === ' ') _song = _song.slice(1, _song.length-1);
		if(_artist.charAt(_artist.charAt(0) === ' ')) _artist = _artist.slice(1, _artist.length);

		return {playlist: _playlist, song: _song, artist: _artist};
	},

	// returns how many tokens there are separated by -
	tokenCounter: (tokens) => {
		tokens = tokens.join(' ');
		tokens = tokens.split(separator);
		return tokens.length;
	},

	// reduces a track name too big to be displayed
	stringCutter: (track) => {
		if(track.title.length > 40) {
			track.title = track.title.substring(0, 40) + '...';
		}
		return track.title;
	},

	// returns the prefix to be displayed on embed messages
	getPrefix: (message) => {
		let prefix = guildCmdPrefixes.get(message.guild.id);
		if(prefix.length > 1) prefix += ' ';
		return prefix;
	}
}