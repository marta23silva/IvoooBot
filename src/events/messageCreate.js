
module.exports = (client, message) => {
    
    console.log(message.author.username + " said: " + message.content);
    
    // if (message.author.bot) return;

    // const prefix = "bkg"; // getPrefix(); TODO
    // if (message.mentions.has(client.user) && !message.mentions.everyone) {
    //     const file = new AttachmentBuilder(PATH_IMG_BKG_MOM);
    //     const prefixDisplay = new EmbedBuilder()
    //         .setColor(HEXCODE_BLACK)
    //         .setAuthor({
    //             name: MSG_PING
    //         })
    //         .setDescription(`My prefix is: ${prefix}`)
    //         .setThumbnail('attachment://bkgWithMom.jpg');
    //     return message.reply({ embeds: [prefixDisplay], files: [file] });
    // }
    // if (!message.content.toLowerCase().startsWith(prefix)) return;

    // const tokens = message.content.slice(prefix.length).trim().split(/ +/g);
    // const command = tokens.shift().toLowerCase();
    // const loadedCmd = client.commands.get(command);
    
    // if (!loadedCmd) return;
    // loadedCmd.execute(message, tokens);
};
  