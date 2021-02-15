const { escapeMarkdown } = require('discord.js');

var commandObject = {
  name: 'resetwarn',
  description: 'Reimposta gli avvertimenti dei membri',
  help: 'Usa questo comando se vuoi resettare gli avvertimenti di un membro del server o di tutti i membri.',
  usage: ' (@utente | username | ID )',
  aliases: ['reset-warn', 'reset'],
  examples: ['', ' @DTrombett#2000', ' Trombett', ' 597505862449496065'],
  time: 5000,
  execute: async (message, args, client, prefix) => {
    try {
      if (!message.guild.available)
        return client.error('Guild is unavailable.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      if (!message.member.hasPermission('ADMINISTRATOR'))
        return message.channel.send('Non hai abbastanza permessi ler eseguire questa azione!')
          .catch(console.error);
      if (!args[0]) {
        var sent = await message.channel.send('Sei sicuro di voler cancellare gli avvertimenti di tutti i membri del server? **NOTA: Questa azione non può essere annulata!**')
          .catch(console.error);
        if (!sent)
          return;
        let reacted = await sent.react('✅')
          .then(() => {
            return sent.react('❎');
          })
          .catch(console.error);
        if (!reacted)
          return sent.edit('Non ho abbastanza permessi per aggiungere reazioni al messaggio!')
            .catch(console.error);
        function filter(reaction, user) {
          return ['✅', '❎'].includes(reaction.emoji.name) && user.id === message.author.id;
        }
        await sent.awaitReactions(filter, {
          max: 1,
          time: 60000,
          errors: ['time']
        })
          .then(async (collected) => {
            const reaction = collected.first();
            if (reaction.emoji.name === '✅') {
              client.resetVar('warn', 'id', message.guild.id);
              message.channel.send('Fatto! Ho resettato gli avvertimenti di tutti i membri del server.')
                .catch(console.error);
              return sent.delete()
                .catch(console.error);
            } else {
              let sent2 = await message.channel.send('Ok! Comando cancellato.')
                .catch(console.error);
              if (sent2)
                return sent2.delete({ timeout: 10000 })
                  .catch(console.error);
            }
          })
          .catch(async (err) => {
            console.error(err);
            message.channel.send('Non hai scelto nessuna risposta! Comando cancellato.')
              .catch(console.error);
            message.delete()
              .catch(console.error);
            sent.delete()
              .catch(console.error);
            sent.delete({ timeout: 10000 })
              .catch(console.error);
          });
        return;
      }
      var target = await client.findMember(message, args.join(' '), true);
      if (target === null)
        return;
      if (!target)
        return message.channel.send('Non ho trovato questo membro!')
          .catch(console.error);
      if (target.user.id == message.guild.ownerID || target.hasPermission('ADMINISTRATOR') || target.roles.highest.position >= message.member.roles.highest.position && message.guild.ownerID != message.author.id)
        return message.channel.send("Non hai abbastanza permessi per eseguire questa azione!")
          .catch(console.error);
      if (!target.user.tag)
        return client.error('Failed to get member tag.', message) && message.channel.send('Si è verificato un errore!')
          .catch(console.error);
      client.resetVar('warn', 'member', target);
      return message.channel.send(`Fatto! Ho resettato tutti gli avvertimenti di **${escapeMarkdown(target.user.tag)}**.`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;