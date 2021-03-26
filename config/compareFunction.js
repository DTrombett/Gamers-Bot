const { GuildMember } = require('discord.js');
const normalize = require('./normalize');

/**
 * @param {GuildMember} a 
 * @param {GuildMember} b 
 */
module.exports = (a, b) => {
    if ([normalize(a.user.tag), normalize(b.user.tag)].sort()[0] == normalize(a.user.tag))
        return -1;
    return 1;
}