module.exports = {

	data: {
		name: 'messageCreate'
	},
	
	async execute(messageCreate) {
		
		console.log(messageCreate.author.username + ' said: ' + messageCreate.content);
		const prefix = 'ivooo';

		if(messageCreate.author.bot) return;
		if(!messageCreate.content.toLowerCase().startsWith(prefix)) return;

		const tokens = messageCreate.content.slice(prefix.length).trim().split(/ +/g);
		const command = tokens.shift().toLowerCase();

		const loaded = messageCreate.client.commands.get(command);
		if(!loaded) return;

		loaded.execute(messageCreate);
	}
};