// Load up the discord.js library
const Discord = require("discord.js");
const sf = require('./sharedFunctions.js');
// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"]});


// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config/config.json");
const discordConfig = config.discordCreds;
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`The bot is online.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
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
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(discordConfig.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(discordConfig.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if(command === "last") {
    let postID = await sf.getHotPosts();
    let postTitle = await sf.getPostData("Title", postID[0]);
    let postBody = await sf.getPostData("Body",postID[0]);
    let postURL = await sf.getPostData("URL", postID[0]);
    let postAuthor = await sf.getPostData("Author", postID[0]);
    let postIcon = await sf.getPostData("AuthorIcon", postID[0]);
    //message.channel.send(postTitle);
    const embed = new Discord.MessageEmbed()
     .setColor(0x3498DB)
     .setURL(postURL)
     .setAuthor(postAuthor.name, postIcon)
     .setTitle(postTitle)
     .setDescription(postBody.slice(0,4096));
     message.channel.send({ embeds: [embed] });
  };
});

client.login(discordConfig.token);