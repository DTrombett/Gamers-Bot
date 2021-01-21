module.exports = {
  name: 'messageUpdate',
  description: '',
  async execute(oldMessage, newMessage, client, db) {
    try {
      var message = newMessage.author !== null ? newMessage : await newMessage.fetch();
      if(message.content == oldMessage.content || message.author.bot) return;
      client.events.get('message').execute(message, client, db);
      var log = client.getServerLog(message);
      const embed = client.embedLog(`Messaggio modificato`, `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`, message.author, '', message.guild)
      .addField('Prima', oldMessage.content === null ? '*UNKNOWN*' : oldMessage.content)
      .addField('Dopo', message.content)
      .setFooter(`Message ID: ${message.id} | Canale: #${message.channel.name}`);
      log.send(embed);
    } catch (err) {
      console.log(err, oldMessage, newMessage);
    }
  }
};