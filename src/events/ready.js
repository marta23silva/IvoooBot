const { lavacordManager } = require('../../bot');
const config = require('../../config.js');

module.exports = {
	run: () => {
		console.log('Ready, connecting to Lavalink...');

		lavacordManager.connect().then(success => {
			console.log(`Connected to ${success.filter(ws => ws != null).length} Lavalink node(s) out of ${config.nodes.length} total node(s).`);
		}).catch(err => {
			console.error(`Error connecting to Lavalink:`, err);
			process.exit(1);
		})
	},

	eventName: 'ready'
}