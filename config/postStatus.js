const { MessageEmbed, Message } = require("discord.js");

/**
 * Post a status to the status channel.
 * @param {Array<MessageEmbed>} embeds - An array of embeds for the message
 * @returns {Promise<Message>} The message sent
 */
module.exports = async (embeds) => {
    var customClientAvatar = _client.user.buildAvatar();
    embeds.forEach(e => e
        .setAuthor(e.author.name, customClientAvatar, customClientAvatar)
        .setThumbnail(customClientAvatar)
        .setTitle('STATUS')
        .setFooter('Made by DTrombett')
        .setTimestamp());
    var options = { 'username': _client.user.username, 'avatarURL': _client.user.buildAvatar(), 'embeds': embeds };
    return _client.webhook.send(options)
        .catch(err => console.error(err));
}