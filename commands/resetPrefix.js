module.exports = {
  name: 'resetprefix',
  description: 'Reimposta il prefisso nel server!',
  help: 'Cancella tutti i prefissi impostati nel server! Potrai continuare ad usare il prefisso predefinito `-` o menzionare il bot.',
  usage: '',
  aliases: ['reset'],
  examples: [''],
  time: 2000,
  execute: function(message, args, client, prefix) {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER')) return message.channel.send('Mi displiace ma non hai abbastanza permessi per utilizzare questo comando!')
        .catch(console.error);
      var prefixes = client.resetVar('prefix', 'id', message.guild.id);
      if (!prefixes) return (client.error('Failed to reset prefix', message), message.channel.send('Si è verificato un errore!')
        .catch(console.error));
      return message.channel.send(`Fatto! Ho resettato tutti i prefissi nel server!`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};