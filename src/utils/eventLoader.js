import { readdir } from "fs";

export default async (client) => {
  readdir("./src/events/", async (err, files) => {
    if (err) return console.error(err); 
          
    for(const file of files) {
      const event = (await import(`../events/${file}`)).default;
      
      if(!event.execute) {
        console.error(`Event file "${file}" is missing execute()`);
        continue;
      }

      if(event.once) {
        client.once(event.name, (...args) => event.execute(client, ...args));
      } else {
        client.on(event.name, (...args) => event.execute(client, ...args));
      }
    }
  });
};