import { SlashCommandBuilder } from '@discordjs/builders';

export default {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('This is just a test command'),

    async execute(interaction) {
        return interaction.reply({ content: 'OK' });
    }
}