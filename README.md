<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="Ivooo" src="https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png?width=530&height=530"> 
<h1 align="center">Ivooo</h1>
<h3 align="center">Discord Bot</h3>
<br/>

> Ivooo is a Discord bot coded in javascript with [discord.js](https://discord.js.org) by [Marta Silva](https://github.com/marta23silva). <br/>
> This bot is not being hosted yet. More info on the commands available on `src/commands`.

## Dependencies:
[![](https://img.shields.io/badge/discord.js-13.6.0-blue.svg?logo=npm)](https://www.npmjs.com/package/discord.js)
[![](https://img.shields.io/badge/minecraft--server--util-5.2.9-green?logo=npm)](https://www.npmjs.com/package/minecraft-server-util)
[![](https://img.shields.io/badge/node--fetch-2.6.1-yellow?logo=npm)](https://www.npmjs.com/package/node-fetch)
[![](https://img.shields.io/badge/dotenv-10.0.0-orange?logo=npm)](https://www.npmjs.com/package/dotenv)
[![](https://img.shields.io/badge/fs-0.0.1--security-9cf?logo=npm)](https://www.npmjs.com/package/fs)
[![](https://img.shields.io/badge/nodemon-2.0.15-lightgrey?logo=npm)](https://www.npmjs.com/package/nodemon)
[![](https://img.shields.io/badge/Lavalink-3.4-ff69b4?logo=github)](https://github.com/freyacodes/Lavalink)
[![](https://img.shields.io/badge/erela.js-2.3.3-success?logo=npm)](https://www.npmjs.com/package/erela.js)

## How to use this code on your bot:

### Requirements ✔️
* [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* [Tenor Key](https://tenor.com/developer/keyregistration) to get gifs from their API
* Java 11 (or greater)

### Bot Setup ⚙️
* Clone the repository with `git clone https://github.com/marta23silva/IvoooBot.git` or download in ZIP format.
* Install all the dependencies by running `npm i`.
* Download the latest version of [Lavalink](https://github.com/freyacodes/Lavalink/releases). Put an [`application.yml`](https://github.com/freyacodes/Lavalink/blob/master/LavalinkServer/application.yml.example) file in the same directory.
* Create a `.env` file and complete it with your info:
```
BOT_TOKEN=
CLIENT_ID=

OWNER_ID=
TENOR_KEY=
LAVALINK_PASSWORD=
```
You can get a bot Token and a Client ID on the [Discord Developer Portal](https://discord.com/developers/applications). The Owner ID should be your Discord ID. The Lavalink password is defined on the `application.yml` file. <br/>
The default prefix is `ivooo`, but you can change this in `src/utils/getPrefix.js`.

### How to run 🛸
* Open a terminal/cmd window and run `npm run lavalink` to start your Lavalink server (only needed when using voice commands).
* Open a terminal/cmd window and run `npm run start` to start your bot.

## Acknowledgements

Very nice and useful resources that help me **a whole lot**: 
* [Anson the Developer](https://www.youtube.com/c/AnsontheDeveloper/featured)
* [The Coding Train](https://www.youtube.com/user/shiffman)
* [Filipe Deschamps](https://www.youtube.com/c/FilipeDeschamps)

## Contributors

- Bot Contributors
 
![image](https://contrib.rocks/image?repo=marta23silva/IvoooBot)

Thank you!
