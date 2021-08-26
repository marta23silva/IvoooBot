const separator = '-';
const apostrophe = "'";

module.exports = {
	saveOriginal: (tokens) => {
		tokens = tokens.join(' ');
		tokens = tokens.split(separator);
		return {playlist: tokens[0], song: tokens[1], artist: tokens[2]};
	},

	apostropheCheck: (tokens) => {
		let msg = tokens.join(' ');
		if(msg.charAt(0) === apostrophe) msg = apostrophe + msg;
		for(var i = 1; i < msg.length-1; i++) {
			if(msg.charAt(i) === apostrophe && msg.charAt(i-1) !== apostrophe) msg = msg.substring(0, i) + apostrophe + msg.substring(i, msg.length);
		}
		if(msg.charAt(msg.length-1) === apostrophe) msg = msg + apostrophe;
		return msg.split(' ');
	},

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

	tokenCounter: (tokens) => {
		tokens = tokens.join(' ');
		tokens = tokens.split(separator);
		return tokens.length;
	},

	stringCutter: (track) => {
		if(track.title.length > 40) {
			track.title = track.title.substring(0, 40) + '...' + '     ';
		}
		return track.title;
	}
}