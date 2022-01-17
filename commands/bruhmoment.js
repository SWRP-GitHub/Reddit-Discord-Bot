module.exports = {
    name: "bruhmoment",
    description: "Bruh Moment",
    execute(message, args) {
      const Discord = require("discord.js");
      const sf = require("../sharedFunctions");
      (async () => {
        try {
          const embed = new Discord.MessageEmbed()
          .setColor(0xf1c232)
          .setImage(
            "https://i.redd.it/y3zq03ly8qt31.jpg"
          )
          .setTitle("Bruh")
          
          message.channel.send({embeds: [embed]})
        } catch (e) {
        //ERROR COMMAND HERE
          console.log("something went wrong");
        }
      })();
    },
  };
  