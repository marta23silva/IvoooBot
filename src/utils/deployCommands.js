import { Routes } from 'discord-api-types/v9';
import { readdir } from 'fs';
import { REST } from '@discordjs/rest';
import { config } from '../config/env.js'
import { ChalkAdvanced } from 'chalk-advanced';

readdir('./src/commands/', async (err, files) => {
    if(err) return console.error(err);
    
    let commands = [];
    for(const file of files) {

        if(!file.endsWith('.js')) continue;

        const command = (await import(`../commands/${file}`)).default;
        commands.push(command.data.toJSON());
    }

    const rest = new REST({
        version: '10',
    }).setToken(config.botToken);

    (async () => {
        try {
            // Load slash commands for all servers
            if(config.devStatus==='PRD') {
                await rest.put(Routes.applicationCommands(config.clientId), {
                    body: [],
                });
                console.log(`${ChalkAdvanced.white('Ivooo')} ${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green('Successfully registered commands globally')}`);
            }
            // Load slash commands for 1 server
            else if(config.devStatus==='DEV') {
                await rest.put(Routes.applicationGuildCommands(config.clientId, config.serverId), {
                    body: commands,
                });
                console.log(`${ChalkAdvanced.white('Ivooo')} ${ChalkAdvanced.gray(">")} ${ChalkAdvanced.green('Successfully registered commands locally')}`);
            }
            else {
                console.error(`${ChalkAdvanced.red('Unknown environment: ')} + ${config.devStatus}`);
            }
        } catch(err) {
            console.error(err);
        }
    })();
});