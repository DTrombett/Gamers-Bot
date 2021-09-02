const { Message } = require("discord.js");
const error = require("./error");

/**
 * @param {Message} message
 */
module.exports = async (message) => {
    if (message.author.id === '159985870458322944' && message.channel.id === '794591916934955058' && message.content === `We ${message.mentions.users.first().toString()}, sei arrivato al livello 10 : D`) try {
        return message.member.roles.add('794526671817801769');
    } catch (err) {
        return await error(err, message);
    }
    if (message.channel.id === '814591797786443836' && message.embeds[0]) {
        for (let embed of message.embeds) {
            if (embed.author) {
                const member = message.guild.members.cache.find(m => m.user.tag === embed.author.name);
                if (member && member.id === '711920127221694464') {
                    message.delete()
                        .catch(err => error(err, message));
                    break;
                };
            }
        }
    }
}