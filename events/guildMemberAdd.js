const { Welcomer } = require("canvacord");
const { MessageAttachment, GuildMember, Message } = require('discord.js');

/**
 * Emitted whenever a user joins a guild.
 * @param {GuildMember} member The member that has joined a guild
 * @returns {?Promise<Message>} The message sent in welcome channel
 */
module.exports = async (member) => {
  try {
    if (member.guild.id != '722882956472877076')
      return null;
    var channel = member.guild.channels.cache.get('785171652001660939');
    var image = await new Welcomer()
      .setUsername(member.user.username)
      .setDiscriminator(member.user.discriminator)
      .setMemberCount(member.guild.members.cache.size)
      .setGuildName("MM E-Sports")
      .setAvatar(member.user.displayAvatarURL({ format: 'png', dynamic: false, size: 4096 }))
      .setColor("title", "#E74C3C")
      .setColor("title-border", "#E67E22")
      .setColor("avatar", "#000000")
      .setColor("border", "#8015EA")
      .setColor("username-box", "#E74C3C")
      .setColor("username", "#E67E22")
      .setColor("hashtag", "#000000")
      .setColor("discriminator", "#E67E22")
      .setColor("discriminator-box", "#E74C3C")
      .setColor("message", "#E67E22")
      .setColor("message-box", "#E74C3C")
      .setColor("member-count", "#E67E22")
      .setColor("border", "#E74C3C")
      .setBackground("https://cdn.discordapp.com/attachments/786210484168032386/806081431003594763/MM_E-sports2.png?size=4096")
      .setText("title", "WELCOME")
      .setText("message", "Benvenuto in MM E-Sports")
      .setText("member-count", "Ora siamo " + member.guild.members.cache.size.toString())
      .toAttachment();
    let attachment = new MessageAttachment(image.toBuffer(), "welcome.png");
    return channel.send(attachment);
  } catch (err) {
    client.error(err, member);
  }
}