module.exports = {
    name: "episode1",
    description: "Pulls the first episode post.",
    execute(message, args) {
      const Discord = require("discord.js");
      const sf = require("../sharedFunctions");
      (async () => {
        try {
          let postID = "kk712u";
          let postTitle = await sf.getPostData("Title", postID);
          let postBody = await sf.getPostData("Body", postID);
          let postURL = await sf.getPostData("URL", postID);
          let postAuthor = await sf.getPostData("Author", postID);
          let postIcon = await sf.getPostData("AuthorIcon", postID);
          const embed = new Discord.MessageEmbed()
            .setColor(0x8f39c4)
            .setImage(
              "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png"
            )
            .setURL(postURL)
            .setAuthor(postAuthor.name, postIcon)
            .setTitle(postTitle)
            .setDescription(
              postBody.slice(0, 1000) +
                `.....\n [CONTINUE READING ON REDDIT](${postURL})`
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
  