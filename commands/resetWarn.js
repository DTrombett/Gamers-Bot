const { Util } = require('discord.js');

module.exports = {
  name: 'resetwarn',
  description: '',
  async execute(message, args, client, db) {
    try {
      let perms = message.member.permissions;
      if (!perms.has('ADMINISTRATOR')) return message.channel.send('Non hai abbastanza permessi ler eseguire questa azione!');
      if (!args[0]) {
        var sent = await message.channel.send('Sei sicuro di voler cancellare gli avvertimenti di tutti i membri del server? **NOTA: Questa azione non può essere annulata!**');
        await sent.react('✅');
        await sent.react('❎');
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
              message.channel.send('Fatto! Ho resettato gli avvertimenti di tutti i membri del server.');
              return sent.delete();
            } else {
              message.channel.send('Ok! Comando cancellato.');
            }
          })
          .catch(err => {
            console.log(err);
            message.channel.send('Non hai scelto nessuna risposta! Comando cancellato.');
            message.delete();
            sent.delete();
          });
        return;
      }
      var member = await client.findMember(message, args.join(' '), true);
      if (member === null) return;
      if (!member) return message.channel.send('Non ho trovato questo membro!');
      client.resetVar('warn', 'member', member);
      message.channel.send(`Fatto! Ho resettato tutti gli avvertimenti di **${Util.escapeMarkdown(member.user.tag)}**.`);
    } catch (err) {
      console.log(err, message);
    }
  }
};