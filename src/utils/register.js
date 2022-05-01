const path = require("path");
const { lstatSync, readdirSync } = require("fs");
const { ChalkAdvanced } = require("chalk-advanced");

async function registerCommands(client, dir) {
  const filePath = path.join(__dirname, dir);
  const commandFiles = readdirSync(filePath);
  for (const file of commandFiles) {
    const stat = lstatSync(path.join(filePath, file));
    if (stat.isDirectory()) {
      registerCommands(client, path.join(dir, file));
    }
    if (file.endsWith(".js")) {
      const loaded = require(path.join(filePath, file));

      if (!loaded.data || !loaded.execute) {
        console.log(ChalkAdvanced.red(`Missing params from command: ${file}`));
      } else {
        client.commands.set(loaded.data.name, loaded);
        // console.log(ChalkAdvanced.cyan(`Loaded command: ${loaded.data.name}`));
      }

      if (loaded.aliases) {
        loaded.aliases.forEach((alias) => {
          client.aliases.set(alias, loaded);
          // console.log(ChalkAdvanced.gray(`Loaded alias: ${alias}`));
        });
      }
    }
  }
}

async function registerEvents(client, dir) {
  const filePath = path.join(__dirname, dir);
  const eventFiles = readdirSync(filePath);
  for (const file of eventFiles) {
    const stat = lstatSync(path.join(filePath, file));
    if (stat.isDirectory()) {
      registerEvents(client, path.join(dir, file));
    }
    if (file.endsWith(".js")) {
      const loaded = require(path.join(filePath, file));

      if (!loaded.data || !loaded.execute) {
        console.log(ChalkAdvanced.red(`Missing params from event: ${file}`));
      } else {
        client.on(loaded.data.name, loaded.execute);
        // console.log(ChalkAdvanced.yellow(`Loaded event: ${loaded.data.name}`));
      }
    }
  }
}

module.exports = { 
  registerCommands,
  registerEvents,
};
