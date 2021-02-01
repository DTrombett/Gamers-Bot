module.exports = {
  name: 'removeprefix',
  description: 'Rimuovi un prefisso dal server!',
  help: 'Usa questo comando 0er rimuovere un prefisso del bot nel server!',
  usage: ' {prefix}',
  aliases: ['remove'],
  examples: [' -', ' !'],
  time: 2000,
  execute: function(message, args, client, prefix) {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER')) return message.channel.send('Mi displiace ma non hai abbastanza permessi per utilizzare questo comando!')
        .catch(console.error);
      if (!args[0]) return message.channel.send('Devi inserire il prefisso da rimuovere!')
        .catch(console.error);
      var prefixes = client.getIDVar('prefix', message.guild.id).filter(p => !p.includes(client.user.id));
      if (!prefixes.includes(args[0])) return message.channel.send('Questo prefisso non esiste!')
        .catch(console.error);
      prefixes = client.setIDVar('prefix', prefixes.remove(args[0]));
      if (!prefixes) return (client.error('Failed to remove prefix', message), message.channel.send('Si è verificato un errore!')
        .catch(console.error));
      return message.channel.send(`Fatto! Ho rimosso il prefisso \`${args[0]}\``)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};