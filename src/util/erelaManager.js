const { Manager } = require("erela.js");
const { ChalkAdvanced } = require("chalk-advanced");

module.exports = function (client) {
    let isConnected = false;
    return new Manager({
        nodes: [
        {
            host: "127.0.0.1",
            port: 2333,
            password: process.env.LAVALINK_PASSWORD,
        },
        ],
        send: (id, payload) => {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
        },
    })
    .on("nodeConnect", (node) => {
        isConnected = true;
        console.log(ChalkAdvanced.green(`Node ${node.options.identifier} connected.`))
        return;
    })
    .on("nodeError", (node, error) => {
        // console.log(node);
        // console.log("------------------------------");
        // console.log(error);
        if(!isConnected) {
            console.log(ChalkAdvanced.red(`Couldn't connect to Lavalink.`))
        }
        return;
    });
};