const { Message } = require("discord.js");
const antiInvites = require("../automod/anti-invites");
const cursedWords = require("../automod/cursedWords");
const { getMemberVar } = require("./variables");

/**
 * Scan a message with the automod system.
 * @param {Message} message - The message to check
 */
module.exports = (message) => {
  if (getMemberVar('muted', message.member)) message.delete();
  if (message.member.hasPermission('ADMINISTRATOR') || !message.args[0]) return;
  const args = message.args;
  if (message.content && message.content.includes('discord.gg/') || message.content.includes('discord.com/invite/')) antiInvites(message, args);
  cursedWords(message, args);
};