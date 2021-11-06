const embed = require('../../utils/messageEmbed');

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

module.exports =  {
	command: {
		name: 'draw-lots',
		category: 'Text',
		description: 'Ivooo assigns one item of the first list to another of the second list.',
		aliases: ['dl', 'lots', 'sorteio'],
		usage: 'draw-lots [a,b,c] [d,e,f]'
	},

	run: async (tokens, message) => {

		message.content = message.content.replace(/]/g, '');
		let msg = message.content.split('[');
		msg.shift();
		let list1 = msg[0].split(',');
		let list2 = msg[1].split(',');

		if(list1.length != list2.length) { return message.channel.send(embed.red_error('❌  **Error:** Your lists must have the same length.')); }

		shuffle(list1);
		shuffle(list2);

		let i = 0;
		let result = '';
		while(i < list1.length) {
			result += list1[i] + ' -> ' + list2[i] + '\n';
			i++;
		}
		message.channel.send(result);
	}
}
