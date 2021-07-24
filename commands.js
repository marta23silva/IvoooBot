const ivooo = require('./commands/ivoooTalk.js');
const gif = require('./commands/gifs.js');
const say = require('./commands/sayHello.js')

// List of commands
const commands = { ivooo, gif, say };

module.exports = async function (msg) {
	console.log(msg.content);
	let tokens = msg.content.split(" ");
	let command = tokens.shift();							// take the first word
	command = command.toLowerCase();

	// valid bot call
	if(command == 'ivooo') {

		command = tokens.shift();								// take the second word
		if(command == null) {										// no word => bot talk
			command = 'ivooo';
		}
		commands[command](msg, tokens);
	}
}
