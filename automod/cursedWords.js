const { Message } = require("discord.js");
const { setMemberVar, getMemberVar, getIDVar } = require("../config/variables");

/**
 * Check if a message has cursed words.
 * @param {Message} message - The message to scan
 * @param {Array<String>} args - The args of this message
 * @returns {?Promise<Message>} The repky to the user if there is a cursed word in the message
 */
module.exports = async (message, args) => {
    args = args.map(arg => arg.toLowerCase().replace(/\u200b/g, ''));
    message.content = message.content.toLowerCase().replace(/\u200b/g, '')
    var { cursedWords } = require("../config/cursedWords");
    cursedWords = cursedWords.concat(getIDVar('cursedWords', message.guild));
    var boolean = cursedWords.some(word => !word.includes(' ') ? args.some(arg => arg == word) : message.content.includes(word));
    if (!boolean) return null;
    if (message.deletable) message.delete({
        reason: 'Contains a cursed word'
    })
        .catch(console.error);
    setMemberVar('warn', getMemberVar('warn', message.member) + 1, message.member);
    return message.reply('non usare queste parole!')
        .catch(console.error);
}