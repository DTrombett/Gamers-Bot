const Discord = require ('discord.js');

const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION", "USER", "GUILD_MEMBER" ]});

const  prefix = '-';

const request = require('request');

const fs = require('fs');

client.commands = new Discord.Collection();

const Database = require("@replit/database");

const db = new Database();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => res.send('Hello, World'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', async () => {
  client.commands.get('ready').execute(Discord, client, prefix, fs, Database, db, commandFiles);
  });
 
client.once('reconnecting', async () => {
 console.log('Bot is trying to reconnect...');
});

client.once('disconnect', () => {
 console.log('Bot was disconnected!');
});

client.on("debug", info => {
client.commands.get("debug").execute(info, Discord, client, prefix, fs, Database, db, commandFiles);
});

client.on("warn", function(info){
    console.log(`WARNING: ${info}`);
});

client.once('error', error => {
 console.log(`An error occurred: ${error} `);
});

client.once('invalidated', async () => {
  client.commands.get('invalidated').execute(Discord, client, prefix, fs, Database, db, commandFiles);
  });

client.ws.on('INTERACTION_CREATE', async interaction => {
  client.api.interactions(interaction.id, interaction.token).callback.post({data: {
  type: 4,
  data: {
    content: 'hello world!'
    }
  }
})
const data = interaction.data;
console.log(data);
})


client.on('message', async message =>{
    if(message.content.startsWith(prefix)) {
      if(!message.author.bot){

    var args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send(`🏓 Pong! Latency: ${Date.now() - message.createdTimestamp}ms. API Latency: ${Math.round(client.ws.ping)}ms`);
    } else if (command === 'beta') {
        client.commands.get('beta').execute(message, args, Discord, client, prefix, fs, db, commandFiles, command);
    } else if (command === 'random') {
        client.commands.get('random').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'help' || command == 'aiuto') {
        client.commands.get('help').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'mute') {
        client.commands.get('mute').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'unmute') {
        client.commands.get('unmute').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'kick') {
        client.commands.get('kick').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'clear') {
        client.commands.get('clear').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'eval') {
        client.commands.get('eval').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'avatar') {
        client.commands.get('avatar').execute(message, args, Discord, client, command, prefix, fs);
    } else if (command === 'mean') {
        client.commands.get('mean').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'quote') {
        client.commands.get('quote').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'play') {
        client.commands.get('play').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'reactionrole') {
        client.commands.get('reactionrole').execute(message, args, Discord, client, channel);
    } else if (command === 'ban') {
        client.commands.get('ban').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'tempmute') {
        client.commands.get('tempmute').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'cat') {
        client.commands.get('cat').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'dog') {
        client.commands.get('dog').execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command);
    } else if (command === 'cmds') {
        client.commands.get('cmds').execute(Discord, client, prefix, fs, Database, db, commandFiles);
    } 
   }
  } else if (!message.author.bot) {
      if (message.mentions.members.has('781084946608816139')) {
      message.channel.send(`Heilà! Il mio prefisso è **\`${prefix}\`** Scrivi **\`${prefix}help\`** per scoprire tutti i miei comandi!`);
      }
}});

client.on('guildMemberAdd', async guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Member');
    const attachment = new Discord.MessageAttachment('https://cdn.discordapp.com/attachments/786210484168032386/786560494613561354/c1c203_6eea7ea049cf43f0b2dfaccc6894bb81_mv2.gif?size=4096', 'Welcome.gif');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('784097529380995122').send(`<@${guildMember.user.id}> Benvenuto nel server! <a:hello:786547600580280323> Ora siamo in **${guildMember.guild.memberCount
    }**. <a:party_dance:786547672819433483> Ricordati prima di tutto di leggere le **regole** <a:sunglasses_face:786547726560788501>`, attachment);
});

client.on("messageDelete", (message) => {
  client.commands.get('messageDelete').execute(message, Discord, client, prefix, fs, Database, db, commandFiles);
});

client.on("messageDeleteBulk", (messages) => {
  client.commands.get('messageDeleteBulk').execute(messages, Discord, client, prefix, fs, Database, db, commandFiles);
});

const token = db.get("token").then(value => {
  client.login(value);
});
