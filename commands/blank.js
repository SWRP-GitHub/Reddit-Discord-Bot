module.exports = {
    name: "blank",
    description: "Blank Template for creating commands for the bot. Must be placed in the commands folder as a js file",
    execute(message, args) {
      const Discord = require("discord.js");
      const sf = require("../sharedFunctions");
      (async () => {
        try {
        //COMMAND CODE HERE
        } catch (e) {
        //ERROR COMMAND HERE
          console.log("something went wrong");
        }
      })();
    },
  };
  