// File to handle all the sentences Ivooo will display

const replies = ["What's up?", "O que é?! 🤬", "Manooo", "Agora não... ABAKACHI TIME 😳🍍"]

module.exports =  {
	run: async (tokens, message) => {
		if(message.author.id != process.env.SUZZY_ID) {
			let index = Math.floor(Math.random() * replies.length);
			message.channel.send(replies[index]);
		} else {
			message.channel.send('Vai já buscar o abakachi');
		}
	},

	command: 'ivooo'
}