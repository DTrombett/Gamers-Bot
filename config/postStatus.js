const error = require("./error");
const { client } = require('../index');
const { MessageEmbed, Message } = require("discord.js");

/**
 * Post a status to the status channel.
 * @param {Array<MessageEmbed>} embeds - An array of embeds for the message
 * @returns {Promise<Message>} The message sent
 */
module.exports = (embeds) => {
    var customClientAvatar = client.user.buildAvatar();
    embeds.forEach(e => e
        .setAuthor(e.author.name, customClientAvatar, customClientAvatar)
        .setThumbnail(customClientAvatar)
        .setTitle('STATUS')
        .setFooter('Made by DTrombett')
        .setTimestamp());
    var options = { 'username': client.user.username, 'avatarURL': client.user.buildAvatar(), 'embeds': embeds };
    return client.webhook.send(options)
        .catch(err => {
            return error(err, embeds);
        });
}