import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, SlashCommandBuilder } from '@discordjs/builders';
import { ButtonStyle } from 'discord.js';

const GENSHIN_REDEEM_URL = 'https://genshin.hoyoverse.com/en/gift?code=';

export default {
    data: new SlashCommandBuilder()
        .setName('redeemcode')
        .setDescription('Shows your redeem codes in embed format')
        .addRoleOption((option) =>
            option
            .setName('role')
            .setDescription('Choose which role to ping')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('code')
            .setDescription('Redeem codes, separated by a space')
            .setRequired(true)
        )
        .addStringOption((option) =>
            option
            .setName('rewards')
            .setDescription('Brief description of the redeem code\'s rewards')
        ),

    async execute(interaction) {

        let row = new ActionRowBuilder();
        if(interaction.options) {
            const role = interaction.options.getRole('role');
            const codeInput = interaction.options.getString('code');
            const rewards = interaction.options.getString('rewards');
            
            const codeList = codeInput.split(' ');
            if(codeList.length > 5) { 
                return interaction.reply({ content: 'You can only add up to 5 codes at a time' }) 
            }

            let descCodes='';
            for(const code of codeList) {
                row.addComponents(createButton(code,GENSHIN_REDEEM_URL+code));
                descCodes += '> '+code+'\n';
            }

            let descRewards='';
            if(rewards) {
                descRewards='**Rewards:**\n'+ rewards+'\n';
            }

            if(role.name && role.name.toLowerCase().includes('genshin')) {
                return interaction.reply({ 
                    content: `<@&${role.id}>`,
                    embeds: [createEmbed(descCodes,descRewards)],
                    components: [row],
                    allowedMentions: {
                        roles: [`${role.id}`]
                    }
                });
            }
            else {
                return interaction.reply({ 
                    content: `<@&${role.id}>`,
                    embeds: [createEmbed(descCodes,descRewards)],
                    allowedMentions: {
                        roles: [`${role.id}`]
                    }
                });
            }
        }
    }
}

function createEmbed(codes,descRewards) {
    return new EmbedBuilder()
    .setTitle('Redeemable Codes')
    .setDescription(
        codes
        + descRewards
    )
    .setThumbnail('https://raw.githubusercontent.com/marta23silva/IvoooBot/master/images/Banzai.png')
};

function createButton(code,url) {
    return new ButtonBuilder()
    .setLabel(code)
    .setStyle(ButtonStyle.Link)
    .setURL(url)
};