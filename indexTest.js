console.log('Starting...');

const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'USER', 'GUILD_MEMBER']
});
client.prefix = '-';
const request = require('request');
const fs = require('fs');
const Database = require('@replit/database');
const db = new Database();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = fs.readdirSync('./events/').filter(event => event.endsWith('.js'));
const slashCommands = fs.readdirSync('./slashCommands/').filter(file => file.endsWith('.js'));
const twemoji = require('twemoji');
const express = require('express');
const { inspect } = require('util');
const app = express();
const port = 3000;

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.slashCommands = new Discord.Collection();
client.cooldown = new Discord.Collection();

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

client.once('ready', () => {
  client.events.get('ready').execute(client, db);
});
client.once('shardReconnecting', id => {
  console.log(`Shard ${id} is trying to reconnect...`);
});
client.once('shardDisconnect', (event, shardID) => {
  client.events.get('shardDisconnect').execute(event, shardID, client, db);
});
client.once('shardResume', (shardID, replayed) => { console.log(`Shard ${shardID} resumed! Replayed ${replayed} events.`);
});
client.once('error', error => {
  console.error(`ERROR! -> ${error}`);
});
client.once('invalidated', () => {
  client.events.get('invalidated').execute(client, db);
});
client.on('message', message => {
  client.events.get('message').execute(message, client, db);
});
client.on('debug', info => {
  client.events.get('debug').execute(info, client, db);
});
client.on('warn', info => {
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
  client.events.get('messageDelete').execute(message, client, db);
});
client.on('messageDeleteBulk', messages => {
  client.events.get('messageDeleteBulk').execute(messages, client, db);
});
client.on('channelCreate', channel => {
  client.events.get('channelCreate').execute(channel, client, db);
});
client.on('channelDelete', channel => {
  client.events.get('channelDelete').execute(channel, client, db);
});
client.on('emojiDelete', emoji => {
  client.events.get('emojiDelete').execute(emoji, client, db);
});
missclient.on('emojiCreate', emoji => {
  client.events.get('emojiCreate').execute(emoji, client, db);
});
missclient.on('guildMemberAdd', member => {
  client.events.get('guildMemberAdd').execute(member, client, db);
});
missclient.on('guildMemberAvailable', member => {
  client.events.get('guildMemberAvailable').execute(member, client, db);
});
missclient.on('guildMemberRemove', member => {
  client.events.get('guildMemberRemove').execute(member, client, db);
});
missclient.on('emojiCreate', emoji => {
  client.events.get('emojiCreate').execute(emoji, client, db);
});
missclient.on('roleCreate', role => {
  client.events.get('roleCreate').execute(role, client, db);
});
missclient.on('roleDelete', role => {
  client.events.get('roleDelete').execute(role, client, db);
});
missclient.on('channelPinsUpdate', (channel, time) => {
  client.events.get('channelPinsUpdate').execute(channel, time, client, db);
});
missclient.on('emojiUpdate', (oldEmoji, newEmoji) => {
  client.events.get('emojiUpdate').execute(oldEmoji, newEmoji, client, db);
});
missclient.on('guildBanAdd', (guild, user) => {
  client.events.get('guildBanAdd').execute(guild, user, client, db);
});
missclient.on('guildBanRemove', (guild, user) => {
  client.events.get('guildBanRemove').execute(guild, user, client, db);
});
missclient.on('guildMembersChunk', (members, guild) => {
  client.events.get('guildMembersChunk').execute(members, guild, client, db);
});
missclient.on('guildMemberUpdate', (oldMember, newMember) => {
  client.events.get('guildMemberUpdate').execute(oldMember, newMember, client, db);
});
missclient.on('guildUpdate', (oldGuild, newGuild) => {
  client.events.get('guildUpdate').execute(oldGuild, newGuild, client, db);
});
missclient.on('messageUpdate', (oldMessage, newMessage) => {
  client.events.get('messageUpdate').execute(oldMessage, newMessage, client, db);
});
missclient.on('roleUpdate', (oldRole, newRole) => {
  client.events.get('roleUpdate').execute(oldrole, newRole, client, db);
});
client.on('userUpdate', (oldUser, newUser) => {
  client.events.get('userUpdate').execute(oldUser, newUser, client, db);
});
client.on('voiceStateUpdate', (oldMember, newMember) => {
  client.events.get('voiceStateUpdate').execute(oldMember, newMember, client, db);
});

client.ws.on('INTERACTION_CREATE', interaction => {
  client.events.get('INTERACTION_CREATE').execute(interaction, client, inspect);
});

app.get('/', (req, res) => res.send('Hello, World!'));
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

db.get('token').then(value => {
  client.login(value);
});