const fs = require("fs");

module.exports = {
  data: {
    name: "guildCreate",
  },

  // still needs to deploy commands automatically when bot joins
  async execute(guild) {
    const toAdd = {
      id: guild.id,
      owner: guild.ownerId,
      prefix: "ivooo",
    };

    fs.readFile(
      "./data/guilds.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          return console.log(err);
        } else {
          var obj = JSON.parse(data); // convert to an object
          obj.guilds.push(toAdd); // add the data
          var json = JSON.stringify(obj, null, 2); // convert back to json
          fs.writeFile("./data/guilds.json", json, "utf8", (err) => {
            if (err) {
              return console.log(err);
            }
          });
          return console.log("Added: " + toAdd.id);
        }
      }
    );
  },
};
