'use strict';

console.log('Starting...');

// Starts declaring constants

const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER'],
  messageCacheMaxSize: 500,
  messageCacheLifetime: 86400,
  messageSweepInterval: 3600,
  messageEditHistoryMaxSize: 10,
  fetchAllMembers: true,
  disableMentions: 'everyone',
  restWsBridgeTimeout: 36000,
  restTimeOffset: 100,
  restRequestTimeout: 10000,
  presence: {
    status: 'online',
    activity: {
      name: '-help',
      type: 'LISTENING',
    }
  }
});
const fs = require('fs');
const Database = require('@replit/database');
const db = new Database();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events/').filter(event => event.endsWith('.js'));
const slashCommands = fs.readdirSync('./slashCommands/').filter(file => file.endsWith('.js'));
const automod = fs.readdirSync('./automod/').filter(file => file.endsWith('.js'));
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const { inspect } = require('util');
client.time = 0;
client.var = function(name) {
  return require(`./variables/${name}.json`);
};

console.log('Constants declared');

// Load commands

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.cooldown = new Discord.Collection();
client.automod = new Discord.Collection();

for (let file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
for (let file of eventFiles) {
  const event = require(`./events/${file}`);
  client.events.set(event.name, event);
}
for (let file of slashCommands) {
  const slashCommand = require(`./slashCommands/${file}`);
  client.slashCommands.set(slashCommand.name, slashCommand);
}
for (let file of automod) {
  const automodFile = require(`./automod/${file}`);
  client.automod.set(automodFile.name, automodFile);
}

console.log('All the commands are ready!');

// Track all the events

process.on('unhandledRejection', (reason, promise) => console.log('A promise was rejected! Promise: ', promise, ' Reason: ', reason));
process.on('beforeExit', (code) => console.log('Process is exiting with code: ', code));
process.on('exit', (code) => console.log('Process exit event with code: ', code));
process.on('disconnect', code => console.log('Process disconnected with code: ', code));
process.on('message', (message, sendHandle) => console.log('Process received a message! ', message, sendHandle));
process.on('multipleResolves', (type, promise, reason) => console.error('A promise was resolved morr than once! Promise: ', promise, ' Type: ', type, ' Reason: ', reason));
process.on('uncaughtException', (err, origin) => console.log('Error occurred! Error: ', err, ' Origin: ', origin, ' Process exiting...'));
process.on('uncaughtExceptionMonitor', (err, origin) => console.log('Something is fishy... ', err, origin));
process.on('warning', (warning) => console.warn(warning));

client.once('ready', () => client.events.get('ready').execute(client));
client.once('shardReady', (id, unavailableGuilds) => console.log(`Shard ${id} is ready! Unavailable Guilds: `, unavailableGuilds));
client.once('error', error => console.error('A Discord error occurred! Error: ', error));
client.once('shardError', (error, shardID) => console.error(`Received an error on shard ${shardID} `, `Message: ${error}`));
client.once('shardResume', (id, replayedEvents) => console.log(`Shard ${id} resumed! Replayed ${replayedEvents}`));
client.once('invalidated', () => {
  client.events.get('invalidated').execute(client);
});
client.on('shardReconnecting', (id) => console.log(`Shard ${id} is trying to reconnect...`));
client.once('shardDisconnect', (event, id) => console.log(`Shard ${id} disconnected! Event: ${event} `));
client.on('message', message => {
  client.events.get('message').execute(message, client);
});
client.on('debug', info => {
  client.events.get('debug').execute(info, client);
});
client.on('warn', function(info) {
  console.warn(`WARNING: ${info}`);
});
client.on('guildCreate', guild => {
  console.log(`Bot joined a new guild! Guild: ${inspect(guild)}`);
});
client.on('guildDelete', guild => {
  console.log(`Bot left a guild! Guild: ${inspect(guild)}`);
});
client.on('guildUnavailable', guild => {
  console.log(`A guild is unavailable! Guild: ${inspect(guild)}`);
});
client.on('rateLimit', rateLimitInfo => {
  console.log(`Bot hitted rate limit! Info: ${inspect(rateLimitInfo)}`);
});
client.on('messageDelete', message => {
  client.events.get('messageDelete').execute(message, client);
});
client.on('messageDeleteBulk', messages => {
  client.events.get('messageDeleteBulk').execute(messages, client);
});
client.on('channelCreate', channel => {
  client.events.get('channelCreate').execute(channel, client);
});
client.on('channelDelete', channel => {
  client.events.get('channelDelete').execute(channel, client);
});
client.on('emojiDelete', emoji => {
  client.events.get('emojiDelete').execute(emoji, client);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
  client.events.get('messageUpdate').execute(oldMessage, newMessage, client);
});
client.on('guildBanAdd', (guild, user) => client.events.get('guildBanAdd').execute(guild, user, client));

client.ws.on('INTERACTION_CREATE', interaction => {
  client.events.get('INTERACTION_CREATE').execute(interaction, client);
});

console.log('Events loaded! Starting to connect...');

// Log the bot in and initialize the website

app.get('/', (req, res) => {
  res.sendFile('server/index.html', { root: __dirname });
  console.log('GET request received from: ', req.headers['user-agent']);
});
app.use(function(req, res, next) {
  if (!fs.existsSync(`./server${req.url}`)) return res.send("Non c'è niente qui!");
  res.sendFile(`server${req.url}`, { root: __dirname });
});
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

client.login(process.env.DISCORD_TOKEN);

console.log('Completed starting process! Successfully connecting... Check debug info for informations.');