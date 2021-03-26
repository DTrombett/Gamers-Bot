const automod = require('../config/auto-mod.js');
const { Message } = require('discord.js');
const { getVar } = require('../config/variables.js');
const botUtil = require('../config/botUtil.js');
const error = require('../config/error.js');

/**
 * Emitted whenever a message is created.
 * @param {Message} message - The created message
 */
module.exports = (message) => {
    try {
        if (!message.author || !message.guild || (getVar('man') && message.author.id !== '597505862449496065')) return;
        if (message.author.bot) return botUtil(message);
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