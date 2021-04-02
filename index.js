'use strict';

const { Client, Collection, WebhookClient } = require('discord.js');
const express = require('express');
const { inspect } = require('util');
const { config } = require('dotenv');
const { readdirSync } = require('fs');
const app = express();
const port = 3000;

console.log('Starting');
config();

const partials = ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER'];
const activity = {
    name: '+help',
    type: 'LISTENING',
};
const presence = {
    status: 'online',
    activity: activity
};
const ws = {
    large_threshold: 100
};
const clientOptions = {
    shards: 'auto',
    partials: partials,
    messageCacheMaxSize: 500,
    messageCacheLifetime: 86400,
    messageSweepInterval: 3600,
    messageEditHistoryMaxSize: 10,
    fetchAllMembers: true,
    disableMentions: 'everyone',
    restWsBridgeTimeout: 36000,
    restTimeOffset: 100,
    restRequestTimeout: 10000,
    presence: presence,
    ws: ws
};
const client = new Client(clientOptions);
client.webhook = new WebhookClient('820940087797088266', process.env.WEBHOOK_TOKEN)
exports.client = client;
exports.app = app;

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = readdirSync('./events/').filter(event => event.endsWith('.js'));

client.commands = new Collection();

for (let file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
for (let file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event);
}

// Process events
process.on('unhandledRejection', console.log);
process.on('exit', code => console.log('Process exits with code: ', code));
process.on('disconnect', code => console.log('Process disconnected with code: ', code));
process.on('multipleResolves', (type, _promise, reason) => console.error('A promise was resolved more than once! Type: ', type, ' Reason: ', reason));
process.on('uncaughtException', console.error);
process.on('warning', console.warn);

// Client events
client.once('error', error => console.error('Discord error occurred! Error: ', error));
client.on('shardError', (error, shardID) => console.error(`Received an error on shard ${shardID}\n`, `Message: `, error));
client.once('invalidated', () => process.exit('Bot session invalidated!'));
client.on('warn', console.warn);
client.on('guildCreate', guild => {
    console.log(`Bot joined a new guild! Guild:`);
    console.log(guild);
});
client.on('guildDelete', guild => {
    console.log(`${guild.deleted ? 'A guild was deleted' : 'The bot left a guild'}! Guild:`);
    console.log(guild);
});
client.on('guildUnavailable', guild => {
    console.log(`A guild is unavailable! Guild:`);
    console.log(guild);
});
client.on('rateLimit', rateLimitInfo => console.log(inspect(rateLimitInfo)));

app.use((_req, res) => res.redirect('https://discord.gg/uuHajVFAh5'));
app.listen(port, () => console.log(`Online at http://localhost:${port}`));

client.login();

console.log('Connecting...');