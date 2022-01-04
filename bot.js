const { Client, Intents, Collection } = require("discord.js");
const dotenv = require("dotenv").config();
const fs = require('fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => { console.log('Hello! 🖤'); });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./src/commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.on('interactionCreate', async interaction => {
  
  /* Ignore if it's not a command */
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  
  /* Ignore if command does not exist */
  if(!command) return;

  try { await command.execute(interaction); }
  catch (error) { await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true }); }
});

client.login(process.env.BOT_TOKEN);