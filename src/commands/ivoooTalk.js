// File to handle all the sentences Ivooo will display

const replies = ["What's up?", "O que é?! 🤬", "Manooo", "Agora não... ABAKACHI TIME 😳🍍"]

module.exports = function (msg, args) {
	if(msg.author.id != process.env.SUZZY_ID) {
		let index = Math.floor(Math.random() * replies.length);
		msg.channel.send(replies[index]);
	} else {
		msg.channel.send('Vai já buscar o abakachi');
	}
};