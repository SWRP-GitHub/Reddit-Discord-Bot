module.exports = {
    name: "recentcomment",
    description: "Will grab the most recently submitted comment in the subreddit",
    execute(message, args) {
      const Discord = require("discord.js");
      const sf = require("../sharedFunctions");
      (async () => {
        try {
          let comments = await sf.getRecentComments("Starwarsrp", "id", 1);
          for (i in comments) {
            let commentID = comments[i];
            let author = await sf.getRecentComments(commentID, "author", 1);
            let subreddit = await sf.getRecentComments(commentID, "sub", 1);
            let parentID = await sf.getRecentComments(commentID, "parent", 1);
            let thread = await sf.getPostData("Title", parentID);
            let posturl = await sf.getPostData("URL", parentID);
            let icon = await sf.getRecentComments(commentID, "icon", 1);
            let body = await sf.getRecentComments(commentID, "body", 1);
            //formatting body and adding properties to the embed
            let bodyProc = `-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-\n  ${body}  \n-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`;
            let rptIssue =
              "https://github.com/SWRP-GitHub/Reddit-Discord-Bot/issues/new";
            let footer = "[SWRP-Media-Bot] | ";
            let issueLink = `[GitHub-Issues](${rptIssue})`;
            let embedTitle = "New Comments have arrived...";
            let redditURL = "https://old.reddit.com/r/Starwarsrp/comments/";
            let redditBannerURL =
              "https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png";
            let dootpng =
              "https://i.kym-cdn.com/entries/icons/original/000/011/121/SKULL_TRUMPET_0-1_screenshot.png";
            //the embed
            const embed = new Discord.MessageEmbed()
              .setColor(0x3f5061)
              .setImage(redditBannerURL)
              .setURL(redditURL)
              .setAuthor(author, icon)
              .setTitle(embedTitle)
              .setDescription(bodyProc)
              .setFooter(footer)
              .setTimestamp()
              .setThumbnail(dootpng)
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
              message.channel.send("<---- **Check the swrp-bot-channel for result**")
              message.guild.channels.cache.find(channel => channel.name === "swrp-bot-channel").send({embeds: [embed]})
          }
        } catch (e) {
        //ERROR COMMAND HERE
          console.log("something went wrong");
        }
      })();
    },
  };
  