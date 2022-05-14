const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { ChalkAdvanced } = require("chalk-advanced");
const { readdirSync } = require("fs");
require("dotenv").config();

const token = process.env.BOT_TOKEN;
const clientId = process.env.CLIENT_ID;
deploy(null);

function deploy(guildId) {
  const commands = [];
  // Do not read hidden files or markdown, if any
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
            // console.log(ChalkAdvanced.gray(`Deployed alias: ${alias}`));
          });
        }
        // console.log(ChalkAdvanced.cyan(`Deployed command: ${mainCmd}`));
      }
    }
  }
  const rest = new REST({ version: "10" }).setToken(token);

  if(guildId !== null) {
    rest
      .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
      .then(() => console.log(ChalkAdvanced.green("[LOCAL] Successfully registered application commands.")))
      .catch((err) => {
        console.log(ChalkAdvanced.red("Failed to register applications commands"));
        console.log(err);
      });
  } else {
    rest
      .put(Routes.applicationCommands(clientId), { body: commands })
      .then(() => console.log(ChalkAdvanced.green("[GLOBAL] Successfully registered application commands.")))
      .catch((err) => {
        console.log(ChalkAdvanced.red("Failed to register applications commands"));
        console.log(err);
      });
  }
}

module.exports = { deploy };
