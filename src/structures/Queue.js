const { TextChannel } = require("discord.js");
const { lavacordManager } = require("../../bot");
const { msToHMS } = require('../utils');
const axios = require('axios').default;
// const fetch = require('node-fetch');
const utils = require('../utils');

const urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

module.exports = class Queue {
	constructor(guildId, voiceChannelId, textChannel) {
		this.guildId = guildId;
		this.voiceChannelId = voiceChannelId;
		this.textChannel = textChannel;

		this.queue = [];
		this.player = null;
		this.currentlyPlaying = null;
	}

	async search(term) {
		const node = lavacordManager.idealNodes[0];

		const params = new URLSearchParams();
		params.append('identifier', urlRegex.test(term) ? term : `ytsearch:${term}`);

		/* let url = `https://${node.host}:${node.port}/loadtracks?${params}`;
		let response = await fetch(url);
		let json = await response.json(); */
		
		const data = await axios(`https://${node.host}:${node.port}/loadtracks?${params}`, {
			headers: {
				Authorization: node.password
			}
		}).then(result => {
			console.log(result);
		}).catch(err => {
			console.error(`Error searching for the song:`, err);
			process.exit(1);
		});

		return data.data.tracks ?? [];
		// return json;
	}

	async play(track) {
		this.queue.push(track);

		if(!this.currentlyPlaying) {
			this._playNext();
			return false;
		} else {
			return true;
		}
	}

	async _playNext() {
		const nextSong = this.queue.shift();
		this.currentlyPlaying = nextSong;

		if(!nextSong) {
			this.player = null;
			this.currentlyPlaying = null;

			await lavacordManager.leave(this.guildId);
			this.textChannel.send("Hit the road Ivooo! I'm not coming back no more, no more, no more 🎵");
			return;
		}

		this.textChannel.send(
			new discord.MessageEmbed()
			.setTitle("Now singing: " + nextSong.info.title)
			.addFields([
				{ inline: true, name: "Author", value: nextSong.info.author },
				{ inline: true, name: "Length", value: msToHMS(nextSong.info.length)},
				{ inline: true, name: "Link", value: nextSong.info.uri }
			])
			.setColor("00ff00")
		);

		if(!this.player) {
			this.player = await lavacordManager.join({
				guild: this.guildId,
				channel: this.voiceChannelId,
				node: lavacordManager.idealNodes[0].id
			});

			this.player.on('end', data => {
				if(data.reason === "REPLACED" || data.reason === "STOPPED")

				this._playNext();
			});
		}

		await this.player.play(nextSong.track);
	}
}