module.exports = {
  data: {
    name: "ready",
  },

  async execute(client) {
    console.log(`Logged in as ${client.user.username}#${client.user.discriminator}`);
    console.log("Hello! 🖤");

    if(client.manager) {
        client.manager.init(client.user.id);
    }

    client.user.setPresence({
        activities: [{ name: 'hyenas laughing', type: 'LISTENING' }],
        status: "online",
    });
  },
};
