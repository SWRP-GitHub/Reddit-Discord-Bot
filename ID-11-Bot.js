// Load up the discord.js library
const Discord = require("discord.js");
const sf = require('./sharedFunctions.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"]});
const config = require("./config/config.json");
const discordConfig = config.discordCreds;

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`The bot is online.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
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
    if(message.author.bot) return;
    if(message.content.indexOf(discordConfig.prefix) !== 0) return;
  const args = message.content.slice(discordConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
//Commands
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  ///lastpost embed
  if(command === "lastpost") {
    let postID = await sf.getHotPosts();
    let postTitle = await sf.getPostData("Title", postID[2]);
    let postBody = await sf.getPostData("Body",postID[2]);
    let postURL = await sf.getPostData("URL", postID[2]);
    let postAuthor = await sf.getPostData("Author", postID[2]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[2]);
    const embed = new Discord.MessageEmbed()
     .setColor(0xFF0000)
     .setURL(postURL)
     .setAuthor(postAuthor.name, postIcon)
     .setTitle(postTitle)
     .setDescription(postBody.slice(0,4096));
     message.channel.send({ embeds: [embed] });
  };


  ///Story and Setting embed
  if(command === "setting") {
    let postID = await sf.getHotPosts();
    let postTitle = await sf.getPostData("Title", postID[0]);
    let postBody = await sf.getPostData("Body",postID[0]);
    let postURL = await sf.getPostData("URL", postID[0]);
    let postAuthor = await sf.getPostData("Author", postID[0]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[0]);
    const embed = new Discord.MessageEmbed()
     .setColor(0x3498DB)
     .setURL(postURL)
     .setAuthor(postAuthor.name, postIcon)
     .setTitle(postTitle)
     .setDescription(postBody.slice(0,4096));
     message.channel.send({ embeds: [embed] });
  };

  /////episode embed
  if(command === "episode") {
    let postID = await sf.getHotPosts();
    let postTitle = await sf.getPostData("Title", postID[1]);
    let postBody = await sf.getPostData("Body",postID[1]);
    let postURL = await sf.getPostData("URL", postID[1]);
    let postAuthor = await sf.getPostData("Author", postID[1]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[1]);
    const embed = new Discord.MessageEmbed()
     .setColor(0xF1C232)
     .setURL(postURL)
     .setAuthor(postAuthor.name, postIcon)
     .setTitle(postTitle)
     .setDescription(postBody.slice(0,4096))
     message.channel.send({ embeds: [embed] });
  };
});

client.login(discordConfig.token);