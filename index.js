const discord = require('discord.js');
const client = new discord.Client();
const config = require('./config.json');
const fs = require('fs')
const prefix = config.prefix
client.commands = new discord.Collection();


fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find command");
    return;
  }
  jsfile.forEach((f, i) => {
    console.log(`${f} loaded`)
      });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./commands/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});
client.on('message', message => {
  if (!message.guild) return;
  if (message.author.bot) return;
  
  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(config.prefix.length)
  if (!message.content.startsWith(config.prefix)) return;
  try {
    let cmd = require(`./commands/${command}.js`)
    cmd.use(client, message, message.member, args, command)
  } catch (err) {
    
  }
})
client.once('ready', () => {
  if (config.embeds){
    const embed = new discord.RichEmbed()
        .setAuthor(`${client.user.username} / Ticket Log`, client.user.avatarURL)
        .setColor("#13cc06")
        .setDescription(":white_check_mark: **Started succesfully**")
    client.channels.get(config.logChannel).send(embed)
  } else  {
    client.channels.get(config.logChannel).send(":white_check_mark: **Started succesfully**b")
  }
  client.user.setPresence({game: {name: config.playing, type: config.activityType},status: config.status})
})
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.login(process.env.TICKET_BOT_TOKEN)
