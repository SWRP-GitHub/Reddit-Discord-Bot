module.exports = {
  name: "galaxymap",
  description:
    "Will grab the galaxy map",
  execute(message, args) {
    const Discord = require("discord.js");
    const sf = require("../sharedFunctions");
    (async () => {
      try {
        const embed = new Discord.MessageEmbed()
          .setColor(0xf1c232)
          .setImage(
            "https://github.com/SWRP-GitHub/SWRP-Website/blob/main/Maps/Capture.PNG?raw=true"
          )
          .setURL("https://swrp-media.com/galaxy_map_mobile.html")
          .setTitle("The Galaxy Map")
          .setDescription(
            "GitHub: [Click Here](https://github.com/SWRP-GitHub/SWRP-Website)\nOriginal Map: [Click Here](https://plannedexponent.carto.com/builder/30797a0c-72db-42de-bbec-e9ffc188ec25/embed)"
          )
          .setFooter(`[SWRP-Media-Bot]`)
          .setTimestamp();
          message.channel.send("<---- **Check the bot-lobby for result**")
          message.guild.channels.cache.find(channel => channel.name === "bot-lobby").send({embeds: [embed]})
      } catch (e) {
        //ERROR COMMAND HERE
        console.log("something went wrong");
      }
    })();
  },
};
