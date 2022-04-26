const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { readdirSync } = require("fs");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;

function deploy(guildId) {
  const commands = [];
  // Do not read hidden files, if any
  const directories = 
    readdirSync("./src/commands")
    .filter((file) => !/(^|\/)\.[^\/\.]/g.test(file) && !file.endsWith(".md"));

  for (const directory of directories) {
    if (directory !== "not-a-slash-command") {
      const files = 
         readdirSync(`./src/commands/${directory}`)
        .filter((file) => file.endsWith(".js"));

      for (const file of files) {
        const command = require(`./src/commands/${directory}/${file}`);
        commands.push(command.data.toJSON());
        const mainCmd = command.data.name;

        if (command.aliases) {
          command.aliases.forEach((alias) => {
            command.data.name = alias;
            commands.push(command.data.toJSON());
            console.log(`Deployed alias: ${alias}`);
          });
        }

        console.log(`Deployed command: ${mainCmd}`);
      }
    }
  }

  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
}

module.exports = { deploy };
