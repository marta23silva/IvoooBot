// File to handle all the sentences Ivooo will display

const replies = ["What's up?", "O que é?! 🤬", "Manooo", "Agora não... ABAKACHI TIME 😳🍍", "Estou a comer restos... sozinho 🥺"]
const suzzy_replies = ["Vai já buscar o abakachi!", "Aii manooo, não me apetece nada ir trabalhar!", "`offline` ~ fui vadiar o dia inteiro...", "Agora não. Vou descansar um bocadinho.", "ESTÁS-ME A OUVIR BERNARDO?!? ... Merda da net.", "Ai manooo, este PC 😫"]

module.exports =  {
	command: {
		name: 'ivooo',
		category: 'Text',
		description: 'Ivooo replies with a random message.',
		aliases: [],
		usage: 'ivooo'
	},

	run: async (tokens, message) => {
		let index;
		if(message.author.id != process.env.SUZZY_ID) {
			index = Math.floor(Math.random() * replies.length);
			message.channel.send(replies[index]);
		} else {
			index = Math.floor(Math.random() * suzzy_replies.length);
			message.channel.send(suzzy_replies[index]);
		}
	}
}