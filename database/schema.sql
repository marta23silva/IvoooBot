CREATE DATABASE DiscordBotDB;

CREATE TABLE Playlist (
	name VARCHAR(100) NOT NULL PRIMARY KEY
);

CREATE TABLE Songs (
	songTitle VARCHAR(100) NOT NULL,
	artist VARCHAR(100) NOT NULL,
	playlistName VARCHAR(100) NOT NULL,
	FOREIGN KEY (playlistName) REFERENCES Playlist(name),
	PRIMARY KEY(songTitle, artist, playlistName)
);