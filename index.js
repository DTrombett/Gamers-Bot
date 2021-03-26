'use strict';

console.log('Starting...');

// Starts declaring constants

const { Client, Collection, WebhookClient } = require('discord.js');
const express = require('express');
const app = express();
const port = 3000;
const { inspect } = require('util');
const { config } = require('dotenv');
const { readdirSync } = require('fs');

// Configure the dotenv module
config();

// Create a new Client
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
            name: '+help',
            type: 'LISTENING',
        }
    },
    ws: {
        large_threshold: 100
    }
});
client.webhook = new WebhookClient('820940087797088266', process.env.WEBHOOK_TOKEN)
exports.client = client;
exports.app = app;

// Import all files from folders
const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'));
const eventFiles = readdirSync('./events/').filter((event) => event.endsWith('.js'));
const automod = readdirSync('./automod/').filter(file => file.endsWith('.js'));

console.log('Constants declared');

// Load commands

client.commands = new Collection();
client.slashCommands = new Collection();
client.cooldown = new Collection();
client.automod = new Collection();

for (let file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
for (let file of eventFiles) {
    const event = require(`./events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event);
}
for (let file of automod) {
    const automodFile = require(`./automod/${file}`);
    client.automod.set(automodFile.name, automodFile);
}

console.log('All the commands are ready!');

// Process events
process.on('unhandledRejection', console.log);
process.on('exit', code => console.log('Process exits with code: ', code));
process.on('disconnect', code => console.log('Process disconnected with code: ', code));
process.on('multipleResolves', (type, _promise, reason) => console.error('A promise was resolved more than once! Type: ', type, ' Reason: ', reason));
process.on('uncaughtException', console.error);
process.on('warning', console.warn);

// Client events

client.once('error', error => console.error('Discord error occurred! Error: ', error));
client.on('shardError', (error, shardID) => console.error(`Received an error on shard ${shardID} `, `Message: ${error}`));
client.once('invalidated', () => process.exit('Bot session invalidated!'));
client.on('warn', console.warn);
client.on('guildCreate', guild => console.log(`Bot joined a new guild! Guild: ${inspect(guild)}`));
client.on('guildDelete', guild => console.log(`${guild.deleted ? 'A guild was deleted' : 'The bot left a guild'}! Guild: ${inspect(guild)}`));
client.on('guildUnavailable', guild => console.log(`A guild is unavailable! Guild: ${inspect(guild)}`));
client.on('rateLimit', rateLimitInfo => console.log(inspect(rateLimitInfo)));

console.log('Events loaded! Starting to connect...');

// Log the bot in and initialize the website

app.use((req, res) => {
    // var path = req.url.split('/');
    // path.shift();
    // if (req.headers.referer !== 'https://gamersbot.dtrombett.repl.co/' || !req.headers.referer.startsWith(req.headers.origin) || path[0] != 'api') return res.redirect('https://gamersbot.dtrombett.repl.co');
    // path.shift();
    // res.set('Access-Control-Allow-Origin', 'https://gamersbot.dtrombett.repl.co');
    // var response;
    // try {
    //     response = require(`./server/${path[0]}.js`)(req, path, client);
    // } catch (err) {
    //     res.status(404).send();
    // }
    // if (!response) return null;
    // res.send(JSON.stringify(response));
    res.send();
});
app.listen(port, () => console.log(`Online at http://localhost:${port}`));

client.login();

console.log('Completed starting process! Successfully connecting... Check debug info for informations.');