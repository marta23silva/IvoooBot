<img width="150" height="150" align="left" style="float: left; margin: 0 10px 0 0;" alt="Ivooo" src="https://media.discordapp.net/attachments/868061485425893408/868268766788726815/Banzai-TLK.png?width=530&height=530"> 
<h1 align="center">Ivooo</h1>
<h3 align="center">The Discord Bot</h3>

[![](https://img.shields.io/badge/discord.js-v12.5.3-blue.svg?logo=npm)](https://github.com/discordjs)
[![](https://img.shields.io/badge/erela.js-v2.3.3-green.svg?logo=npm)](https://solaris.codes/projects/erelajs/)
[![](https://img.shields.io/badge/lavalink-v2.11.0-red)](https://github.com/freyacodes/Lavalink)
[![](https://img.shields.io/badge/mysql2-v2.2.5-blue.svg?logo=npm)](https://www.npmjs.com/package/mysql2)
> Ivooo is a Discord bot coded in javascript with [discord.js](https://discord.js.org) by [Marta Silva](https://github.com/marta23silva). <br/>
> This bot is not being hosted yet. More info about commands on `src/commands/`.

## How to use this code on your bot:

### Requirements ✔️
* [Node.js & npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* MySQL
* Java 11 or greater
* [Tenor Key](https://tenor.com/developer/keyregistration) to get gifs from their API

### Bot Setup ⚙️
* Clone the repository with `git clone https://github.com/marta23silva/IvoooBot.git` or download in ZIP format.
* Install all the dependencies by running `npm i`.
* Download the latest version of [Lavalink.jar](https://github.com/freyacodes/Lavalink/releases). Put an `application.yml` [file](https://github.com/freyacodes/Lavalink/blob/master/LavalinkServer/application.yml.example) in the same directory.
* Create a MySQL database with the `schema.sql` inside the database directory.
* Create a `.env` file and complete it with your info:
```
BOT_TOKEN=
OWNER_ID=
TENOR_KEY=

DB_USER=
DB_PASSWORD=
DB_NAME=

LAVALINK_HOST=
LAVALINK_PASSWORD=
```
### How to run 🛸
* Open a terminal/cmd window on the directory and run `npm run lavalink` to start your Lavalink server.
* Open another terminal/cmd window and run `npm run start` to start your bot.

## Author

**Marta Silva**

* [Profile](https://github.com/marta23silva "Marta Silva")
* [Website](# "Under Construction")

## Acknowledgements

Very nice and useful resources that help me **a whole lot**: 
* [Anson the Developer](https://www.youtube.com/c/AnsontheDeveloper/featured)
* [The Coding Train](https://www.youtube.com/user/shiffman)
* [Filipe Deschamps](https://www.youtube.com/c/FilipeDeschamps)

<br/>Thank you!
