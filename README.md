<h1 align="center">Ivooo – Discord Bot</h1>
<br/>

> Ivooo is a Discord bot coded in javascript with [discord.js](https://discord.js.org) by [Marta Silva](https://github.com/marta23silva). <br/>
> This bot is not being hosted yet. More info on the commands available on `src/commands`.

## Dependencies:
[![](https://img.shields.io/badge/discord.js-14.13.0-blue.svg?logo=npm)](https://www.npmjs.com/package/discord.js)
[![](https://img.shields.io/badge/dotenv-16.3.1-orange?logo=npm)](https://www.npmjs.com/package/dotenv)
[![](https://img.shields.io/badge/nodemon-3.0.1-lightgrey?logo=npm)](https://www.npmjs.com/package/nodemon)
[![](https://img.shields.io/badge/Lavalink-ff69b4?logo=github)](https://github.com/freyacodes/Lavalink)
[![](https://img.shields.io/badge/erela.js-2.4.0-success?logo=npm)](https://www.npmjs.com/package/erela.js)

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
TOKEN=
GUILD_ID=
STATUS=
STATUSBOT=
DISCORDSTATUS=
LAVALINK_PASSWORD=
```
You can get a bot TOKEN on the [Discord Developer Portal](https://discord.com/developers/applications). The GUILD_ID should be your server's id, in case you want to deploy the commands locally.
STATUS is either DEVELOPMENT (deploy commands in your server of choice) or PRODUCTION (deploying slash commands for all servers). The options for STATUSBOT are online, offline, dnd and away.
The LAVALINK_PASSWORD is defined on the `application.yml` file.

### How to run 🛸
* Open a terminal/cmd window and run `npm run lava` to start your Lavalink server (only needed when using voice commands).
* Open a terminal/cmd window and run `npm run start` to start your bot.

## Acknowledgements

Very nice and useful resources that help me **a whole lot**: 
* [Anson the Developer](https://www.youtube.com/c/AnsontheDeveloper/featured)
* [The Coding Train](https://www.youtube.com/user/shiffman)
* [Filipe Deschamps](https://www.youtube.com/c/FilipeDeschamps)

## Contributors
 
![image](https://contrib.rocks/image?repo=marta23silva/IvoooBot)

Thank you!
