const { guildCmdPrefixes } = require('../../events/ready');

const acceptedCmds = {
	dumb(message, alias) {
		return 'https://tenor.com/bpbwu.gif';
	},
	good(message, alias) {
		if(alias[1] === 'bot' || alias[1] === 'boy') {
			message.react('❤️');
			return 'https://tenor.com/V0YP.gif';
		} else if(alias[1] === 'job') {
			message.react('😁');
			return 'https://tenor.com/bd6ds.gif';
		} else {
			return 'https://tenor.com/KdfT.gif';
		}
	},
	say(message, alias) {
		if(!alias[1]) return 'https://tenor.com/tQTC.gif';
		if(alias[1] === 'hello') {
			return 'https://tenor.com/73qy.gif';
		} else if(alias[1] === 'happy' && alias[2] === 'birthday') {
			return 'https://tenor.com/7Z1g.gif';
		} else {
			alias.shift();
			message.delete();
			return alias.join(' ');
		}
	},
	react(message, alias) {
		return 'https://tenor.com/3cjA.gif';
	}
}

module.exports = {
	command: {
		name: 'react',
		category: 'Text',
		description: 'Sends a different gif based on the alias used.',
		aliases: ['dumb','burro', 'good', 'say'],
		usage: 'react'
	},

	run: async (tokens, message) => {

		let prefix = guildCmdPrefixes.get(message.guild.id);
		let alias = message.content.slice(prefix.length).trim().split(/ +/g);

		if(alias[0] === 'burro') { alias[0] = 'dumb'; }
		const chooseMessage = acceptedCmds[alias[0]];
		const msg = chooseMessage(message, alias);
		message.channel.send(msg);
	}
}