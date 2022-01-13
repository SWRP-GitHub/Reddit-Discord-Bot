module.exports = {
  name: "recentposts",
  description:
    "Will grab the 3 most recently submitted posts, from newest --> oldest",
  execute(message, args) {
    const Discord = require("discord.js");
    const sf = require("../sharedFunctions");
    (async () => {
      try {
        let titles = await sf.getNewPostsV2("Starwarsrp", "title");
        let authors = await sf.getNewPostsV2("Starwarsrp", "author");
        let postIDs = await sf.getNewPostsV2("Starwarsrp", "postid");
        let postURLs = await sf.getNewPostsV2("Starwarsrp", "url");
        let postIcons = await sf.getNewPostsV2("Starwarsrp", "authicon");
        message.channel.send("**New Posts:** \n===================== ");
        for (i in titles) {
          let postBodys = await sf.getPostData("Body", postIDs[i]);
          const embed = new Discord.MessageEmbed()
            .setColor(0xff0000)
            .setImage(
              "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png"
            )
            .setURL(postURLs[i])
            .setAuthor(authors[i], postIcons[i])
            .setTitle(titles[i] + "...")
            .setDescription(
              postBodys.slice(0, 1000) +
                `.....\n [CONTINUE READING ON REDDIT](${postURLs[i]})`
            )
            .setFooter(`[SWRP-Media-Bot]`)
            .setTimestamp();
          message.channel.send({
            embeds: [embed],
          });
        }
      } catch (e) {
        //ERROR COMMAND HERE
        console.log("something went wrong");
      }
    })();
  },
};
