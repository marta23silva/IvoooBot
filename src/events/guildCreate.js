const { readFile, writeFile } = require("fs");
const { deploy } = require("../../deploy-commands");
const { timestampToDate } = require("../utils/utils");

module.exports = {
  data: {
    name: "guildCreate",
  },

  async execute(guild) {

    const toAdd = {
      id: guild.id,
      name: guild.name,
      owner: guild.ownerId,
      prefix: "ivooo",
      joined: timestampToDate(guild.joinedTimestamp),
    };

    readFile(
      "./data/guilds.json",
      "utf8",
      function readFileCallback(err, data) {
        if (err) {
          return console.log(err);
        } else {
          var obj = JSON.parse(data); // convert to an object
          obj.guilds.push(toAdd); // add the data
          var json = JSON.stringify(obj, null, 2); // convert back to json
          writeFile("./data/guilds.json", json, "utf8", (err) => {
            if (err) {
              return console.log(err);
            }
          });
          return console.log("Added: " + toAdd.id);
        }
      }
    );

    deploy(guild.id);
  },
};
