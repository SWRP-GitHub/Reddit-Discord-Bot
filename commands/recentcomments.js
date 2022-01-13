module.exports = {
  name: "recentcomments",
  description:
    "Will grab the 5 most recently submitted comments in the subreddit, from newest --> oldest",
  execute(message, args) {
    const Discord = require("discord.js");
    const sf = require("../sharedFunctions");
    (async () => {
      try {
        let comments = await sf.getRecentComments("Starwarsrp", "id", 5);
        for (i in comments) {
          let commentID = comments[i];
          let author = await sf.getRecentComments(commentID, "author", 5);
          let subreddit = await sf.getRecentComments(commentID, "sub", 5);
          let parentID = await sf.getRecentComments(commentID, "parent", 5);
          let thread = await sf.getPostData("Title", parentID);
          let posturl = await sf.getPostData("URL", parentID);
          let icon = await sf.getRecentComments(commentID, "icon", 5);
          let body = await sf.getRecentComments(commentID, "body", 5);

          const embed = new Discord.MessageEmbed()
            .setColor(0x3f5061)
            .setImage(
              "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png"
            )
            .setURL(posturl)
            .setAuthor(author, icon)
            .setTitle("New Comments have arrived...")
            .setDescription(
              `-=-=-=-=-=-=-=-=-=-=-=-=-\n  ${body}  \n-=-=-=-=-=-=-=-=-=-=-=-=-`
            )
            .setFooter(`[SWRP-Media-Bot]`)
            .setTimestamp()
            .setThumbnail(
              "https://i.kym-cdn.com/entries/icons/original/000/011/121/SKULL_TRUMPET_0-1_screenshot.png"
            )
            .addFields(
              {
                name: "Author of Comment: ",
                value: author,
                inline: true,
              },
              {
                name: "Read the Post:",
                value: `[${thread}](${posturl})`,
                inline: true,
              },
              {
                name: "Subreddit:",
                value: subreddit,
                inline: true,
              }
            );
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
