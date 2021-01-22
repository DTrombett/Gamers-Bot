const { escapeMarkdown } = require('discord.js');

module.exports = {
  name: 'resetwarn',
  description: '',
  async execute(message, args, client, db) {
    try {
      if (!message.guild.available) return message.channel.send('Si è verificato un errore!');
      let perms = message.member.permissions;
      if (!perms.has('ADMINISTRATOR')) return message.channel.send('Non hai abbastanza permessi ler eseguire questa azione!')
        .catch(console.error);
      if (!args[0]) {
        var sent = await message.channel.send('Sei sicuro di voler cancellare gli avvertimenti di tutti i membri del server? **NOTA: Questa azione non può essere annulata!**')
          .catch(console.error);
        if (!sent) return;
        sent.react('✅')
          .then(() => sent.react('❎'));
        const filter = (reaction, user) => {
          return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        await sent.awaitReactions(filter, {
            max: 1,
            time: 60000,
            errors: ['time']
          })
          .then(collected => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
              client.resetVar('warn', 'id', message.guild.id);
              message.channel.send('Fatto! Ho resettato gli avvertimenti di tutti i membri del server.')
                .catch(console.error);
              return sent.delete()
                .catch(console.error);
            } else {
              message.channel.send('Ok! Comando cancellato.')
                .catch(console.error);
            }
          })
          .catch(err => {
            console.log(err);
            message.channel.send('Non hai scelto nessuna risposta! Comando cancellato.')
              .catch(console.error);
            message.delete()
              .catch(console.error);
            sent.delete()
              .catch(console.error);
          });
        return;
      }
      var member = await client.findMember(message, args.join(' '), true);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!')
        .catch(console.error);
      client.resetVar('warn', 'member', member);
      return message.channel.send(`Fatto! Ho resettato tutti gli avvertimenti di **${escapeMarkdown(member.user.tag)}**.`)
        .catch(console.error);
    } catch (err) {
      console.log(err, message);
    }
  }
};