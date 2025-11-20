import { Events } from 'discord.js';

export default {
    name: Events.InteractionCreate,
    once: false,
    execute(client, interaction) {
        
        if(!interaction.isChatInputCommand()) return;

        const commandName = client.commands.get(interaction.commandName);
        if(!commandName) { return; }

        try {
            commandName.execute(interaction, client);
        } catch(err) {
            interaction.reply({
                content: "An error occurred while executing that command.",
                ephemeral: true,
            });
        }
    }
};