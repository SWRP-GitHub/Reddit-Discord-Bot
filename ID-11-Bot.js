// Load up the discord.js library
const Discord = require("discord.js");
const sf = require('./sharedFunctions.js');
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"]
});
const config = require("./config/config.json");
const discordConfig = config.discordCreds;


client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`The bot is online.`);
  client.user.setActivity(`Doin your mom, yea we strait doin your mom`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("messageCreate", async message => {
  // This event will run on every single message received, from any channel or DM.
  if (message.author.bot) return;
  if (message.content.indexOf(discordConfig.prefix) !== 0) return;
  const args = message.content.slice(discordConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  //Commands
  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  ///lastpost embed
  if (command === "lastpost") {

    let postID = await sf.getHotPosts("content");
    let postTitle = await sf.getPostData("Title", postID[2]);
    let postBody = await sf.getPostData("Body", postID[2]);
    let postURL = await sf.getPostData("URL", postID[2]);
    let postAuthor = await sf.getPostData("Author", postID[2]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[2]);
    const embed = new Discord.MessageEmbed()
      .setColor(0xFF0000)
      .setURL(postURL)
      .setAuthor(postAuthor.name, postIcon)
      .setTitle(postTitle)
      .setDescription(postBody.slice(0, 1000) + '.....\n   |CONTINUE READING ON REDDIT|')
      .setFooter(`[IG-88-Bot]: Brought to you by SWRP-Media`)
      .setTimestamp()
      .setImage("https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png")
    message.channel.send({
      embeds: [embed]
    });
  };


  ///Story and Setting embed
  if (command === "setting") {
    let postID = await sf.getHotPosts("content");
    let postTitle = await sf.getPostData("Title", postID[0]);
    let postBody = await sf.getPostData("Body", postID[0]);
    let postURL = await sf.getPostData("URL", postID[0]);
    let postAuthor = await sf.getPostData("Author", postID[0]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[0]);
    const embed = new Discord.MessageEmbed()
      .setColor(0x3498DB)
      .setURL(postURL)
      .setAuthor(postAuthor.name, postIcon)
      .setTitle(postTitle)
      .setDescription(postBody.slice(0, 1000) + '.....\n   |CONTINUE READING ON REDDIT|')
      .setFooter(`[IG-88-Bot]: Brought to you by SWRP-Media`)
      .setTimestamp()
      .setImage("https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png")
    message.channel.send({
      embeds: [embed]
    });
  };

  /////episode embed
  if (command === "episode") {
    let postID = await sf.getHotPosts("content");
    let postTitle = await sf.getPostData("Title", postID[1]);
    let postBody = await sf.getPostData("Body", postID[1]);
    let postURL = await sf.getPostData("URL", postID[1]);
    let postAuthor = await sf.getPostData("Author", postID[1]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[1]);
    const embed = new Discord.MessageEmbed()
      .setColor(0x8f39c4)
      .setImage("https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png")
      .setURL(postURL)
      .setAuthor(postAuthor.name, postIcon)
      .setTitle(postTitle)
      .setDescription(postBody.slice(0, 1000) + '.....\n  |CONTINUE READING ON REDDIT|')
      .setFooter(`[IG-88-Bot]: Brought to you by SWRP-Media`)
      .setTimestamp()

    message.channel.send({
      embeds: [embed]
    });
  };
  //New testing
  if (command === "getnewpostlist") {
    let postTitle = await sf.getNewPosts('title');
    let postURL = await sf.getNewPosts('url');
    message.channel.send('**Generating New Post List:** ')
    for (i in postTitle) {
      message.channel.send(`**${i}:** ` + postTitle[i] + '\n' + postURL[i])
    }
  }

  if (command === "getnewposts") {
    let titles = await sf.getNewPostsV2('Starwarsrp', 'title');
    let authors = await sf.getNewPostsV2('Starwarsrp', 'author');
    let postIDs = await sf.getNewPostsV2('Starwarsrp', 'postid');
    let postURLs = await sf.getNewPostsV2('Starwarsrp', 'url');
    let postIcons = await sf.getNewPostsV2('Starwarsrp', 'authicon');
    message.channel.send('**New Posts:** \n===================== ')
    for (i in titles) {
      let postBodys = await sf.getPostData("Body", postIDs[i]);
      const embed = new Discord.MessageEmbed()
        .setColor(0x3F5061)
        .setImage("https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png")
        .setURL(postURLs[i])
        .setAuthor(authors[i], postIcons[i])
        .setTitle(titles[i])
        .setDescription(postBodys.slice(0, 1000) + ".....\n |CONTINUE READING ON REDDIT|")
        .setFooter(`[IG-88-Bot]: Brought to you by SWRP-Media`)
        .setTimestamp()
      message.channel.send({
        embeds: [embed]
      });
    }
  }
  if (command === "recentcomments") {
    let comments = await sf.getRecentComments('Starwarsrp', 'id', 5);
    for (i in comments) {
      let commentID = comments[i];
      let author = await sf.getRecentComments(commentID, "author", 5);
      let subreddit = await sf.getRecentComments(commentID, "sub", 5);
      let parentID = await sf.getRecentComments(commentID, 'parent', 5);
      let thread = await sf.getPostData("Title", parentID);
      let posturl = await sf.getPostData("URL", parentID)
      let icon = await sf.getRecentComments(commentID, 'icon', 5);
      let body = await sf.getRecentComments(commentID, 'body', 5);

      const embed = new Discord.MessageEmbed()
        .setColor(0x3F5061)
        .setImage("https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png")
        .setURL(posturl)
        .setAuthor(author, icon)
        .setTitle("New Comments have arrived...")
        .setDescription("-=-=-=-=-=-=-=-=-=-=-=-=-\n" + body + "\n-=-=-=-=-=-=-=-=-=-=-=-=-")
        .setFooter(`[SWRP-Media-Bot]: Brought to you by SWRP-Media`)
        .setTimestamp()
        .setThumbnail("https://i.kym-cdn.com/entries/icons/original/000/011/121/SKULL_TRUMPET_0-1_screenshot.png")
        .addFields({
          name: "Author of Comment: ",
          value: author,
          inline: true
        }, {
          name: "Read the Post:",
          value: `[${thread}](${posturl})`,
          inline: true
        }, {
          name: "Subreddit:",
          value: subreddit,
          inline: true
        })
      message.channel.send({
        embeds: [embed]
      });
    };
  };


  ////Singular recent comment
  if (command === "recentcomment") {
    let comments = await sf.getRecentComments('Starwarsrp', 'id', 1);
    for (i in comments) {
      let commentID = comments[i];
      let author = await sf.getRecentComments(commentID, "author", 1);
      let subreddit = await sf.getRecentComments(commentID, "sub", 1);
      let parentID = await sf.getRecentComments(commentID, 'parent', 1);
      let thread = await sf.getPostData("Title", parentID);
      let posturl = await sf.getPostData("URL", parentID)
      let icon = await sf.getRecentComments(commentID, 'icon', 1);
      let body = await sf.getRecentComments(commentID, 'body', 1);

      const embed = new Discord.MessageEmbed()
        .setColor(0x3F5061)
        .setImage("https://styles.redditmedia.com/t5_2tg2b/styles/bannerBackgroundImage_065dobtwx9b71.png")
        .setURL('https://old.reddit.com/r/Starwarsrp/comments/')
        .setAuthor(author, icon)
        .setTitle("New Comments have arrived...")
        .setDescription("-=-=-=-=-=-=-=-=-=-=-=-=-\n" + body + "\n-=-=-=-=-=-=-=-=-=-=-=-=-")
        .setFooter(`[SWRP-Media-Bot]: Brought to you by SWRP-Media`)
        .setTimestamp()
        .setThumbnail("https://i.kym-cdn.com/entries/icons/original/000/011/121/SKULL_TRUMPET_0-1_screenshot.png")
        .addFields({
          name: "Author of Comment: ",
          value: author,
          inline: true
        }, {
          name: "Read the Post:",
          value: `[${thread}](${posturl})`,
          inline: true
        }, {
          name: "Subreddit:",
          value: subreddit,
          inline: true
        })
      message.channel.send({
        embeds: [embed]
      });
    };
  };


});

client.login(discordConfig.token);