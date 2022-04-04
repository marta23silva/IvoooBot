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

const respostas = [
	"Deixa-te de perguntas parvas e vai buscar o abakachi.",
	"Já viste o The Expanse? Não tem nada a ver com o que perguntaste, mas pelo menos é mais interessante.",
	"Nossa, que pergunta trivial...",
	"Sim, desde que vadies menos...",
	"Não, Susana. Deixa-te de ideias mirabolantes e vai comprar o passe.",
	"Estou agora a ver na minha bola de cristal e vejo-te debaixo da ponte, lágrimas, drama e escassez de tabaco.",
	"Acho essa pergunta ilegal... Vai mas é trabalhar no Eclipse!",
	"Ai Ivooo, agora pedem conselhos ao bot... Ao que isto chegou 🤦🏻‍♀️",
	"https://tenor.com/xAMr.gif",
	"Parece que isso dá muito trabalho, por isso não.",
	"Numa escala de 0-10 isso é um grande NÃO.",
	"Depois de ter reunido o comité a decisão foi unânime... Faz o que quiseres, a este ponto não quero saber.",
	"Até podia responder, mas algo me diz que não tens dinheiro suficiente para pagar a minha sabedoria.",
	"https://tenor.com/be5o8.gif",
	"PÁRA DE GASTAR DINHEIRO EM CARROS E OFICINAS E VADIAGENS 🤬 COMO ASSIM ESTÁS FALIDA? CLARO QUE ESTÁS FALIDA!",
	"Sim, é certo de que vai acabar em asneira.",
	"Não. Não. Não. Não. Não. Não. Não. Não. Não. Não. Não. Não. É melhor repetir para interiorizares a resposta: não.",
];

module.exports = {

	data: new SlashCommandBuilder()
	.setName('advice')
	.setDescription('Ivooo is wise. Ivooo gives the best advice.')
	.addStringOption(option => option.setName('question').setDescription('What do you want to ask Ivooo?').setRequired(true)),
	
	aliases: ["conselho"],

	async execute(interaction, tokens) {
		let index = Math.floor(Math.random() * replies.length);

		if(interaction.commandName === 'conselho') {
			index = Math.floor(Math.random() * respostas.length);
			await interaction.reply(respostas[index]);
		} else {
			await interaction.reply(replies[index]);
		}
	},
};