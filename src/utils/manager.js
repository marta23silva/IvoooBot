const { Manager } = require("erela.js");

module.exports = function (client) {
  return new Manager({
    nodes: [
      {
        host: "localhost",
        port: 2333,
        password: process.env.LAVALINK_PASSWORD,
      },
    ],
    send: (id, payload) => {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
    .on("nodeConnect", (node) =>
      console.log(`Node ${node.options.identifier} connected.`)
    )
    .on("nodeError", (node, error) =>
      console.log(
        `Node ${node.options.identifier} had an error: ${error.message}.`
      )
    );
};
