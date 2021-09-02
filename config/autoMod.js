"use strict";
exports.__esModule = true;
// @ts-ignore
exports.automod = void 0;
var antiInvites = require("../automod/anti-invites");
var cursedWords = require("../automod/cursedWords");
// @ts-ignore
var { getMemberVar } = require("./variables");

/**
 * Scan a message with the automod system.
 * @param {Message} message - The message to check
 */
var automod = function (message) {
    if (!message.member)
        return;
    if (getMemberVar('muted', message.member))
        message.delete();
    if (message.member.hasPermission('ADMINISTRATOR') || !message.args[0])
        return;
    var args = message.args;
    if (message.content && message.content.includes('discord.gg/') || message.content.includes('discord.com/invite/'))
        antiInvites(message, args);
    cursedWords(message, args);
};
exports.automod = automod;
