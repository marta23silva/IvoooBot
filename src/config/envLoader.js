import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.TOKEN;
const GUILD_ID = process.env.GUILD_ID;
const STATUS = process.env.STATUS;
const STATUSBOT = process.env.STATUSBOT;
const DISCORDSTATUS = process.env.DISCORDSTATUS;
const LAVALINK_PASSWORD = process.env.LAVALINK_PASSWORD;

if (!TOKEN) {
  throw new Error("Missing TOKEN in .env");
}

export const config = {
  botToken: TOKEN,
  guildId: GUILD_ID,
  devStatus: STATUS,
  botStatus: STATUSBOT,
  discordStatus: DISCORDSTATUS,
  lavalinkPwd: LAVALINK_PASSWORD
};