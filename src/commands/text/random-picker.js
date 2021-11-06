function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

module.exports =  {
	command: {
		name: 'random-picker',
		category: 'Text',
		description: 'Ivooo picks an item from the list',
		aliases: ['pick', 'rp'],
		usage: 'random-picker [a,b,c]'
	},

	run: async (tokens, message) => {

		message.content = message.content.replace(/]/g, '');
		let msg = message.content.split('[');
		msg.shift();
		const list = msg[0].split(',');

		const index = Math.floor(Math.random() * list.length);
		return message.channel.send(list[index]);
	}
}
