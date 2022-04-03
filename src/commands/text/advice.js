const { SlashCommandBuilder } = require('@discordjs/builders');

const replies = [
	"Yes, M'Lady. https://tenor.com/bkNi3.gif",
	"It is certain.",
	"In this world, there are countless of cool things to do. Unfortunately, your idea does fall into such category.",
	"Sweetie, you can’t afford me.",
	"Yes, definelty.",
	"As I see it, yes.",
	"Consider it done.",
	"That sounds like effort, so no.",
	"Life is too short to be doing stupid things. And by stupid things, I meant answering your question!",
	"It's that time of the year when I must say no.",
	"Hell no.",
	"My advisors have come to a unanimous decision, and it’s a—NO!",
	"I’d be delighted.",
	"Concentrate and ask again.",
	"Don't count on it.",
	"On a scale of maybe to absolutely, I would say—absolutely not!",
	"Aye aye, captain!",
	"Your question is... Well, I think I’ll just find a lake full of piranhas to jump into instead.",
];

module.exports = {

	data: new SlashCommandBuilder()
	.setName('advice')
	.setDescription('Ivooo is wise. Ivooo gives the best advice.')
	.addStringOption(option => option.setName('question').setDescription('What do you want to ask Ivooo?').setRequired(true)),
	
	aliases: ["conselho"],

	async execute(interaction, tokens) {
		let index = Math.floor(Math.random() * replies.length);
		await interaction.reply(replies[index]);
	},
};