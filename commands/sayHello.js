
module.exports = function (msg, args) {
	
	let keywords = args.join(" ");
	if(keywords == 'hello') {
		msg.channel.send('https://tenor.com/73qy.gif');
	} else {
		msg.channel.send('https://tenor.com/NrBf.gif');
	}
}