const ivooo = require('./src/commands/ivoooTalk.js');
const gif = require('./src/commands/gifs.js');
const say = require('./src/commands/sayHello.js');

// List of commands
const commands = { ivooo, gif, say };
const comms = ['ivooo', 'gif', 'say'];

module.exports = async function (msg) {
	console.log(msg.content);
	let tokens = msg.content.split(" ");
	let command = tokens.shift();							// take the first word
	command = command.toLowerCase();

	// valid bot call
	if(command == 'ivooo') {

		command = tokens.shift();							// take the second word
		if(command == null) {								// no word => bot talk
			command = 'ivooo';
		}

		if(comms.includes(command)) {
			console.log('command: ' + command);
			commands[command](msg, tokens);
		} else {
			console.log('command: "' + command + '" does not exist.');
		}
	}
}
