CREATE DATABASE DiscordBotDB;

CREATE TABLE Guild (
	guildId VARCHAR(100) NOT NULL PRIMARY KEY,
	guildOwnerId VARCHAR(100) NOT NULL
);

CREATE TABLE GuildConfigurable(
	guildId VARCHAR(100) NOT NULL PRIMARY KEY,
	cmdPrefix VARCHAR(10) DEFAULT 'ivooo',
	modLogId VARCHAR(100)
);

CREATE TABLE Playlist (
	name VARCHAR(100) NOT NULL PRIMARY KEY
);

CREATE TABLE Songs (
	songTitle VARCHAR(100) NOT NULL,
	artist VARCHAR(100) NOT NULL,
	playlistName VARCHAR(100) NOT NULL,
	FOREIGN KEY (playlistName) REFERENCES Playlist(name),
	PRIMARY KEY (songTitle, artist, playlistName)
);