import { Collection } from 'discord.js';
import { readdir } from 'fs';

export default (client) => {
    readdir('./src/commands/', async (err, files) => {
        
        if(err) { return console.error(err); }
        
        for(const file of files) {
    
            if(!file.endsWith('.js')) continue;
    
            const command = (await import(`../commands/${file}`)).default;
            client.commands.set(command.data.name, command);
        }
    });
};