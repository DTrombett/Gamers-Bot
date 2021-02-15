module.exports = async (oldMessage, newMessage, client) => {
  try {
    var message = !newMessage.partial ? newMessage : await newMessage.fetch()
      .catch(console.error);
    if (!message || message.content == oldMessage.content || message.author.bot)
      return;
    client.events.get('message').execute(message, client);
    var log = message.guild.logChannel();
    if (message.content && message.content.length > 1024)
      message.content = message.content.substring(0, 1020) + '...';
    if (oldMessage.content && oldMessage.content.length > 1024)
      oldMessage.content = oldMessage.content.substring(0, 1020) + '...';
    const embed = client.embedLog(`Messaggio modificato`, `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`, message.author, '', message.guild)
      .addField('Prima', oldMessage.content === null ? '*UNKNOWN*' : oldMessage.content)
      .addField('Dopo', message.content)
      .setFooter(`Message ID: ${message.id} | Canale: #${message.channel.name}`);
    log.send(embed);
  } catch (err) {
    client.error(err, newMessage);
  }
}