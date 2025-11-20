import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
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
  clientId: CLIENT_ID,
  serverId: GUILD_ID,
  devStatus: STATUS,
  botStatus: STATUSBOT,
  discordStatus: DISCORDSTATUS,
  lavalinkPwd: LAVALINK_PASSWORD
};