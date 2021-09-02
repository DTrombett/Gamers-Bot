const { Client, WebhookClient, Intents } = require('discord.js'), express = require('express');
const { inspect } = require('util');
const { config } = require('dotenv');
const { readdirSync } = require('fs');
const dashboard = require('./config/dashboard');
const app = express();
const port = 3000;

console.log('Starting');
require('./config/Util');
config();

const intents = new Intents(["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_EMOJIS", "GUILD_VOICE_STATES", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"]);
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
    intents: intents,
    large_threshold: 100
};
const clientOptions = {
    shards: "auto",
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
// @ts-ignore
const client = new Client(clientOptions);
// @ts-ignore
client.loadCommands();
// @ts-ignore
global._client = client;
// @ts-ignore
global._app = app;
// @ts-ignore
client.webhook = new WebhookClient('820940087797088266', process.env.WEBHOOK_TOKEN);

const eventFiles = readdirSync('./events/').filter(event => event.endsWith('.js'));
for (let file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event);
}

// Process events
process
    .on('unhandledRejection', console.log)
    .on('exit', code => console.log('Process exits with code: ', code))
    // @ts-ignore
    .on('disconnect', code => console.log('Process disconnected with code: ', code))
    .on('multipleResolves', (type, _promise, reason) => console.error('A promise was resolved more than once! Type: ', type, ' Reason: ', reason))
    .on('uncaughtException', console.error);

// Client events
client
    .once('error', error => console.error('Discord error occurred! Error: ', error))
    .once('invalidated', () => process.exit(400))
    .on('shardError', (error, shardID) => console.error(`Received an error on shard ${shardID}\n`, `Message: `, error))
    .on('warn', console.warn)
    .on('guildCreate', guild => console.log(`Bot joined a new guild! Guild:\n`, guild))
    .on('guildDelete', guild => console.log(`${guild.deleted ? 'A guild was deleted' : 'The bot left a guild'}! Guild:\n`, guild))
    .on('guildUnavailable', guild => console.log(`A guild is unavailable! Guild:\n`, guild))
    .on('rateLimit', rateLimitInfo => console.log(inspect(rateLimitInfo)));

app
    .use(dashboard)
    .listen(port, () => console.log(`Online at http://localhost:${port}`));

client.login();
console.log('Connecting...');