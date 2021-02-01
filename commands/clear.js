 module.exports = {
   name: 'clear',
   description: "Cancella dei messaggi nella chat!",
   help: 'Usa questo comando per cancellare dei messaggi nella chat. Solo i moderatori possono utilizzare questo comando.',
   usage: ' {numero}',
   examples: [' 15', ' 100'],
   aliases: ['purge', 'prune'],
   time: 2000,
   execute: async function(message, args, client, prefix) {
     try {
       let perms = message.channel.permissionsFor(message.member);
       if(!perms || !perms.has('MANAGE_MESSAGES')) return message.channel.send('Non hai abbastanza permessi per eseguire questa azione!')
       .catch(console.error);
       await message.delete()
         .catch(console.error);
       if (!args[0]) return message.reply("Devi specificare quanti messaggi vuoi eliminare!")
         .catch(console.error);
       if (isNaN(args[0])) return message.reply("Devi specificare un numero!")
         .catch(console.error);
       if (args[0] > 100) return message.reply("Puoi cancellare fino a 100 messaggi!")
         .catch(console.error);
       if (args[0] < 1) return message.reply("Devi cancellare almeno un messaggio!")
         .catch(console.error);
       var count = 0;
       var error;
       let msgs = await message.channel.bulkDelete(args[0], true)
         .catch(err => client.error(err, message) && message.channel.send('Non ho abbastanza permessi per effettuare questa azione!')
           .catch(console.error));
       if (!msgs) return;
       var count = msgs.size;
       if (!count) return client.error('Failed to get messages size.', message) && message.channel.send('Si è verificato un errore!')
         .catch(console.error);
       return message.reply('Ho cancellato con successo ' + count + ' messaggi!')
         .then(msg => {
           msg.delete({ timeout: 5000 })
             .catch(console.error);
         })
         .catch(console.error);
     } catch (err) {
       client.error(err, message);
     }
   }
 };