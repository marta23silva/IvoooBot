const { client } = require('../../../bot');

const replies = ["VERGONHA da PROFISSION!!",
				"Je ne suis pas linfonfon 🥖",
				"Linfonfon êtes-vous, qui appelez-vous linfonfon?! 🤬",
				"Oh mon frère, tu es fou!",
				"Tu m'appelles encore linfonfon et je sors de la discorde!",
				"Ta gueule, tu fais chier..."]

module.exports =  {
	command: {
		name: 'linfonfon',
		category: 'Text',
		description: 'Ivooo replies with a linfonfon message.',
		aliases: [],
		usage: 'linfonfon'
	},

	run: async (tokens, message) => {

		let index = Math.floor(Math.random() * replies.length);
		message.channel.send(replies[index]);

		if(replies[index] === 'VERGONHA da PROFISSION!!') {
			let player = client.manager.players.get(message.guild.id);
			// do not play if user is not in a voice channel.
			if(!message.member.voice.channel) return;
			client.on("raw", (d) => client.manager.updateVoiceState(d));

			if(!player) {
				player = client.manager.create({
					guild: message.guild.id,
					voiceChannel: message.member.voice.channel.id,
					textChannel: message.channel.id,
				});
				player.connect();
			}

			const res = await client.manager.search(
				"https://www.youtube.com/watch?v=Lk0Kc2ahwjQ",
				message.author
			);
			player.queue.add(res.tracks[0]);
			player.play();
		}
	}
}