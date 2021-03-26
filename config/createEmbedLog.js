const { MessageEmbed, User, Guild } = require('discord.js');

/**
 * Create an embed for the logs.
 * @param {String} event - The event occurred
 * @param {String} url - The url of the embed
 * @param {User} user - The user of the action
 * @param {String} content - The content for the embed
 * @param {Guild} guild - The guild where the event occurred
 */
module.exports = (event, url, user, content, guild) => {
    const options = { format: 'png', dynamic: true, size: 4096 };
    if (!user) {
        user = {};
        user.tag = 'UNKNOWN';
        user.displayAvatarURL = () => {
            return guild.iconURL(options);
        };
    }
    const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(event)
        .setURL(url)
        .setAuthor(user.tag, user.displayAvatarURL(options), user.displayAvatarURL(options))
        .setDescription(content)
        .setThumbnail(guild.iconURL(options))
        .setTimestamp();
    return embed;
}
