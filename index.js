/**
 * Project: Gamers Bot
 * Author: DTrombett
 * Version: 5.0 (unstable)
 */

console.log('Starting...');

// Starts declaring constants

const { Client, Collection } = require('discord.js');
const client = new Client({
  partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'],
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
  },
  ws: {
    large_threshold: 100,
    intents: 3934
  }
});
const { readdirSync } = require('fs');
const commandFiles = readdirSync('./commands/').filter(file => {
  return file.endsWith('.js');
});
const eventFiles = readdirSync('./events/').filter((event) => {
  return event.endsWith('.js');
});
const automod = readdirSync('./automod/').filter(file => {
  return file.endsWith('.js');
});
const express = require('express');
const app = express();
const port = 3000;
const { inspect } = require('util');
const Command = require('./config/Command.js');

client.var = (name) => {
  return require(`./variables/${name}.json`);
};

console.log('Constants declared');

// Load commands

client.commands = new Collection();
client.events = new Collection();
client.slashCommands = new Collection();
client.cooldown = new Collection();
client.automod = new Collection();

for (let file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, new Command(command));
}
for (let file of eventFiles) {
  const event = require(`./events/${file}`);
  const eventName = event.split('.')[1];
  client.events.set(eventName, event);
}
for (let file of automod) {
  const automodFile = require(`./automod/${file}`);
  client.automod.set(automodFile.name, automodFile);
}

console.log('All the commands are ready!');

// Track all the events

process.on('unhandledRejection', (reason, promise) => {
  return console.log('Promise rejected! Reason: ', reason);
});
process.on('beforeExit', (code) => {
  return console.log('Process exiting with code: ', code);
});
process.on('exit', (code) => {
  return console.log('Process exit with code: ', code);
});
process.on('disconnect', code => {
  return console.log('Process disconnected with code: ', code);
});
process.on('message', (message, sendHandle) => {
  return console.log('Process received a message! ', message, sendHandle);
});
process.on('multipleResolves', (type, promise, reason) => {
  return console.error('A promise was resolved more than once! Type: ', type, ' Reason: ', reason);
});
process.on('uncaughtException', (err, origin) => {
  return console.log('Error occurred! Error: ', err, ' Origin: ', origin);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
  return console.log('Error ', err, origin);
});
process.on('warning', (warning) => {
  return console.warn(warning);
});

client.once('ready', () => {
  return console.log(`Logged in as ${client.user.tag}`);
});
client.on('shardReady', (id, unavailableGuilds) => {
  return client.events.get('ready')(client, id, unavailableGuilds);
});
client.once('error', error => {
  return console.error('Discord error occurred! Error: ', error);
});
client.on('shardError', (error, shardID) => {
  return console.error(`Received an error on shard ${shardID} `, `Message: ${error}`);
});
client.on('shardResume', (id, replayedEvents) => {
  return client.events.get('resume')(client, id, replayedEvents);
});
client.once('invalidated', () => {
  return process.exit('Bot session invalidated!');
});
client.on('shardReconnecting', (id) => {
  return client.events.get('reconnect')(client, id);
});
client.on('shardDisconnect', (event, id) => {
  return client.events.get('disconnect')(client, event, id);
});
client.on('message', message => {
  return client.events.get('message')(message, client);
});
client.on('debug', info => {
  return client.events.get('debug')(info, client);
});
client.on('warn', info => {
  return console.warn(`WARNING: ${info}`);
});
client.on('guildCreate', guild => {
  return console.log(`Bot joined a new guild! Guild: ${inspect(guild)}`);
});
client.on('guildDelete', guild => {
  return console.log(`Bot left a guild! Guild: ${inspect(guild)}`);
});
client.on('guildUnavailable', guild => {
  return console.log(`A guild is unavailable! Guild: ${inspect(guild)}`);
});
client.on('rateLimit', rateLimitInfo => {
  return console.log(`Bot hitted rate limit! Info: ${inspect(rateLimitInfo)}`);
});
client.on('messageDelete', message => {
  return client.events.get('messageDelete')(message, client);
});
client.on('messageDeleteBulk', messages => {
  return client.events.get('messageDeleteBulk')(messages, client);
});
client.on('channelCreate', channel => {
  return client.events.get('channelCreate')(channel, client);
});
client.on('channelDelete', channel => {
  return client.events.get('channelDelete')(channel, client);
});
client.on('emojiDelete', emoji => {
  return client.events.get('emojiDelete')(emoji, client);
});
client.on('messageUpdate', (oldMessage, newMessage) => {
  return client.events.get('messageUpdate')(oldMessage, newMessage, client);
});
client.on('guildBanAdd', (guild, user) => {
  return client.events.get('guildBanAdd')(guild, user, client);
});
client.on('guildMemberAdd', member => {
  return client.events.get('guildMemberAdd')(member, client);
});

console.log('Events loaded! Starting to connect...');

// Log the bot in and initialize the website

app.use((req, res, next) => {
  var path = req.url.split('/');
  path.shift();
  if (req.headers.referer !== 'https://gamersbot.dtrombett.repl.co/' || !req.headers.referer.startsWith(req.headers.origin) || path[0] != 'api') return res.redirect('https://gamersbot.dtrombett.repl.co');
  path.shift();
  res.set('Access-Control-Allow-Origin', 'https://gamersbot.dtrombett.repl.co');
  var response;
  try {
    response = require(`./server/${path[0]}.js`)(req, path, client);
  } catch (err) {
    res.status(404).send();
    console.error(err);
  }
  if (!response) return;
  res.send(JSON.stringify(response));
});
app.listen(port, () => {
  return console.log(`Listening at http://localhost:${port}`);
});

client.login(process.env.DISCORD_TOKEN);

console.log('Completed starting process! Successfully connecting... Check debug info for informations.');