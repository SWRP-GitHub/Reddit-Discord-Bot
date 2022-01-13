module.exports = {
  name: "story",
  description: "Will grab the Setting and Story post",
  execute(message, args) {
    const Discord = require("discord.js");
    const sf = require("../sharedFunctions");
    (async () => {
      try {
        let postID = "k3qac1";
        let postTitle = await sf.getPostData("Title", postID);
        let postBody = await sf.getPostData("Body", postID);
        let postURL = await sf.getPostData("URL", postID);
        let postAuthor = await sf.getPostData("Author", postID);
        let postIcon = await sf.getPostData("AuthorIcon", postID);
        const embed = new Discord.MessageEmbed()
          .setColor(0x3498db)
          .setURL(postURL)
          .setAuthor(postAuthor.name, postIcon)
          .setTitle(postTitle)
          .setDescription(
            postBody.slice(0, 1012) +
              `\n [CONTINUE READING ON REDDIT](${postURL})`
          )
          .setFooter(`[SWRP-Media-Bot]`)
          .setTimestamp()
          .setImage(
            "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png"
          );
          
          message.guild.channels.cache.find(channel => channel.name === "swrp-bot-channel").send({embeds: [embed]})
      } catch (e) {
        console.log("something went wrong");
      }
    })();
  },
};
