/////////////SWRP Media Bot/////////////////////
// Created by: Almighty_Malgus
// Art Assets by: Maskar
// Reddit Data by: The SWRP Comunity
// Version: 1.0.2
// Features:
//  - Can connect to a Discord to send messages and take commands
//  - Connects to the Reddit API to retrive post/comment data

/////////////Import Libraries
const Discord = require("discord.js");
const sf = require("./sharedFunctions.js");
const fs = require("fs");
const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_INTEGRATIONS"],
});
const config = require("./config/config.json");
const { resolve } = require("path");
const { time } = require("console");
const { add } = require("nodemon/lib/rules");
const { stringify } = require("querystring");
const discordConfig = config.discordCreds;
 
/////////////Bot Starts Here//////////////////
client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`SWRP-Media-Bot is online.`);
  client.user.setActivity(
    `for cmds. Type /commands to pull SWRP-Media-Bots Command List`,
    { type: "WATCHING" }
  );
});

client.on("guildCreate", (guild) => {
  // This event triggers when the bot joins a guild.
  console.log(
    `New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`
  );
  client.user.setActivity(
    `for cmds. Type /commands to pull SWRP-Media-Bots Command List`,
    { type: "WATCHING" }
  );
});

client.on("guildDelete", (guild) => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(
    `for cmds. Type /commands to pull SWRP-Media-Bots Command List`,
    { type: "WATCHING" }
  );
});

//////////////////////Command File Handler//////////////////////////////
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands/")
  .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command);
}


////////////////////////////////////Logger///////////////////////////////////////////
var masterChatLogsArry = []
///////////////////////////////////////////
client.on("messageCreate", async (message) => {
  let bulkRawMessage = {
    server: message.guild.name,
    serverID: message.guildId,
    author: message.author.username,
    authorID: message.author.id,
    timestamp: sf.convertEpochToSpecificTimezone(message.createdTimestamp,0),
    channel: message.channel.name,
    channelID: message.channelId,
    content: message.content,
    contentArry: message.content.split(' ')
  };
  let messageObj = bulkRawMessage;
  masterChatLogsArry.push(messageObj);

  fs.writeFile('ServerChatLog.json', JSON.stringify(masterChatLogsArry), "utf8", (err) => {
    if(err){console.log(`Error parsing ${bulkRawMessage.author}'s message into JSON`)}
    else{console.log(`Successfully wrote ${bulkRawMessage.author}'s message to the Log`)};
  });
});
//////////////////////////////////////////////////////////////////////////////////////


/////////////////Sij Doot Listener////////////////////////////////
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;//filter out bot messages
  let settings = {
    mc: message.content.split(' '),//split the message content into an array
    doot: '<:doot:930786660050927637>',//ID the doot emoji
    sij: '<@169576509181263872>',//Sij ID
    malgus: '<@!204831506294767616>',//Malgus ID
    actuallyMox: '<:actuallymox:900768065778757652>'//Actually Mox ID
  }


  //Array length check
  //Checks the message array and if its 1 or less will append a filler string at the end of the array
  if (settings.mc.length <= 1){
    settings.mc.push('addedSTRING')
    if (settings.mc[0].includes('<@!')&&settings.mc[1].includes(settings.doot)){
      console.log('doot detected')
      message.channel.send(`${settings.malgus} ${settings.actuallyMox} time to read`)
    }
    else{}//Do nothing if message not eligible
  }
  else{
    if (settings.mc[0].includes('<@!')&&settings.mc[1].includes(settings.doot)){
      console.log('im dooting')
      message.channel.send(`${settings.malgus} ${settings.actuallyMox} time to read`)
    }
    else{}//Do nothing if message not eligible
  }
});



///////////////////////// Message Listener/////////////////////////////
// Will fire off on any message received by every user in every channel
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.content.indexOf(discordConfig.prefix) !== 0) return;
  const args = message.content
    .slice(discordConfig.prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  /////////////////////Commands////////////////////////
  if (command === "bruh") {
    client.commands.get("bruhmoment").execute(message, args);
  }

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  }

  ///Story and Setting Embed
  if (command === "story") {
    client.commands.get("story").execute(message, args);
  }

  ///Episode 1 Embed
  if (command === "episode1") {
    client.commands.get("episode1").execute(message, args);
  }

  ///Episode 2 Embed
  if (command === "episode2") {
    client.commands.get("episode2").execute(message, args);
  }

  ///Episode 3 Embed
  if (command === "episode3") {
    client.commands.get("episode3").execute(message, args);
  }

  ///Recent Post Embed
  if (command === "recentpost") {
    client.commands.get("recentpost").execute(message, args);
  }

  ///Recent Posts Embed
  if (command === "recentposts") {
    client.commands.get("recentposts").execute(message, args);
  }

  ///Recent Comments Embed
  if (command === "recentcomments") {
    client.commands.get("recentcomments").execute(message, args);
  }

  ////Recent Comment Embed
  if (command === "recentcomment") {
    client.commands.get("recentcomment").execute(message, args);
  }

  ///Galaxy Map Embed
  if (command === "galaxymap") {
    client.commands.get("galaxymap").execute(message, args);
  }

  ///Command List Embed
  if (command === "commands") {
    client.commands.get("commands").execute(message, args);
  }
  /////////////////////End of Commands////////////////////////
});
////////////////////////End of Message Listener///////////////

///Log the bot into Discord
client.login(discordConfig.token);

