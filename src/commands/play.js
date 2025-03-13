const { SlashCommandBuilder } = require("@discordjs/builders");
const { verifyChannel, msToHMS } = require("../util/utils");
const { error_msg, addedToQueue_msg } = require("../util/embeds");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription(`Plays a song in the voice channel you're in.`)
        .addStringOption((option) =>
            option
            .setName("search")
            .setDescription("Song name or youtube link")
            .setRequired(true)
    ),

    async execute(interaction) {

        const client = interaction.client;
        let player = client.manager.players.get(interaction.guild.id);

        if (verifyChannel(interaction, player)) return;
        if (!player) {
                player = client.manager.create({
                guild: interaction.guild.id,
                voiceChannel: interaction.member.voice.channel.id,
                textChannel: interaction.channel.id,
            });
            player.connect();
        }

        let search, requester;
        if(interaction.options) {
            search = interaction.options.getString("search");
            requester = interaction.user.username + "#" + interaction.user.discriminator;
        }

        const res = await client.manager.search(
            search,
            interaction.author
        );

        if (res.loadType === "NO_MATCHES") {
            const noMatches = error_msg(`I'm sorry, there were no matches for your search.`)
            return interaction.reply({ embeds: [noMatches] });
        }

        const result = res.tracks[0];
        player.queue.add(result);

        let songAdded = addedToQueue_msg(
            "PLAYING NEXT: " + result.title,
            result.author,
            msToHMS(result.duration),
            requester,
            result.thumbnail
        );

        let isQueueEmpty = true;
        if (player.queue.size >= 1) {
            isQueueEmpty = false;
            interaction.reply({ embeds: [songAdded] });
        }
        if (!player.playing && !player.paused && !player.queue.size) {
            player.play();
        }
        if (!isQueueEmpty) { return; }

        songAdded = addedToQueue_msg(
            "NOW PLAYING: " + result.title,
            result.author,
            msToHMS(result.duration),
            requester,
            result.thumbnail
        );
        return interaction.reply({ embeds: [songAdded] });
    },
};
