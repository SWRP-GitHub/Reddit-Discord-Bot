module.exports = {
  name: "recentpost",
  description: "Will grab the most recent post from the Subreddit.",
  execute(message, args) {
    const Discord = require("discord.js");
    const sf = require("../sharedFunctions");
    (async () => {
      try {
        let postID = await sf.getNewPostsV2("Starwarsrp", "postid");
        let postTitle = await sf.getPostData("Title", postID[0]);
        let postBody = await sf.getPostData("Body", postID[0]);
        let postURL = await sf.getPostData("URL", postID[0]);
        let postAuthor = await sf.getPostData("Author", postID[0]);
        let postIcon = await sf.getPostData("AuthorIcon", postID[0]);
        const embed = new Discord.MessageEmbed()
          .setColor(0xff0000)
          .setURL(postURL)
          .setAuthor(postAuthor.name, postIcon)
          .setTitle(postTitle + "...")
          .setDescription(
            postBody.slice(0, 1000) +
              `.....\n [CONTINUE READING ON REDDIT](${postURL})`
          )
          .setFooter(`[SWRP-Media-Bot]`)
          .setTimestamp()
          .setImage(
            "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png"
          );
          message.channel.send("<---- **Check the bot-lobby for result**")
          message.guild.channels.cache.find(channel => channel.name === "bot-lobby").send({embeds: [embed]})
      } catch (e) {
        console.log("something went wrong");
      }
    })();
  },
};
