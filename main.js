const dotenv = require('dotenv').config().parsed;
const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require('fs');

// loads commands and gives them to Discord
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// events
client.on('ready', () => {
  console.log("Logged as: " + client.user.tag);
  client.user.setActivity("!help for info, in NSFW channels only!", {type: "PLAYING"})
    .then(presence => console.log(`Activity set to: ${presence.activities[0].name}`))
    .catch(console.error);
});

client.on('message', msg => {
  if(msg.author.username + "#" + msg.author.discriminator == client.user.tag) return; // ignore messages from bot

  // check if message starts with command sign, prepare args and execute
  if(msg.content.substring(0,1) == "!"){
    const args = msg.content.substring(1).split(" ");
    const command = args[0];
    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).execute(msg, args);
    }catch{
      msg.reply('**There was an error trying to execute that command.**');
    }
  }else return;  
});

// start bot
client.login(dotenv.TOKEN);