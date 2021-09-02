const { automod } = require('../config/autoMod.js');
const { Message } = require('discord.js');
const error = require('../config/error.js');

/**
 * Emitted whenever a message is created.
 * @param {Message} message - The created message
 */
module.exports = message => {
    try {
        if (!message.guild || message.author.bot || (message.client.manteinance && message.author.id !== '597505862449496065')) return;
        if (!message.member) return;
        const prefix = message.prefix;
        if (prefix) {
            const command = message.command;
            const args = message.args;
            args.shift();
            if (command) command.execute(message, args, prefix);
        }
        automod(message);
    } catch (err) {
        error(err, message);
    }
}