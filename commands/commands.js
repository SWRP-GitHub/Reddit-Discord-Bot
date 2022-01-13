module.exports = {
    name: "commands",
    description: "List of the bots commands",
    execute(message, args) {
      const Discord = require("discord.js");
      const sf = require("../sharedFunctions");
      (async () => {
        try {
          const embed = new Discord.MessageEmbed()
          .setColor(0xf1c232)
          .setImage(
            "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png"
          )
          .setTitle("Command List:")
          .setDescription(
            "- `/recentpost` = Will grab the most recently submitted post\n\n- `/recentposts` = Will grab the 3 most recently submitted posts, from newest --> oldest\n\n- `/recentcomment` = Will grab the most recently submitted comment in the subreddit\n\n- `/recentcomments` = Will grab the 5 most recently submitted comments in the subreddit, from newest --> oldest\n\n- `/story` = Will grab the Setting and Story post\n\n- `/episode1` = Will grab the First Episode post\n\n- `/episode2` = Will grab the Second Episode post\n\n-`/galaxymap`= Will grab the galaxy map\n"
          )
          .setFooter(`[SWRP-Media-Bot]`)
          .setTimestamp();
        message.channel.send({
          embeds: [embed],
        });
        } catch (e) {
        //ERROR COMMAND HERE
          console.log("something went wrong");
        }
      })();
    },
  };
  