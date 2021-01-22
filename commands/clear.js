 module.exports = {
   name: 'clear',
   description: "Cancella dei messaggi nella chat!",
   async execute(message, args, client, db) {
     try {
       await message.delete();
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
       await message.channel.bulkDelete(args[0], true)
         .then(ms => count = ms.size)
         .catch(err => {
           message.channel.send('Non ho abbastanza permessi per effettuare questa azione!')
             .catch(console.error);
           console.error(error, message);
           error = true;
         });
       if (error) return;
       message.reply('Ho cancellato con successo ' + count + ' messaggi!')
         .then(msg => {
           msg.delete({ timeout: 5000 })
             .catch(console.error);
         })
         .catch(console.error);
     } catch (err) {
       console.error(err, message);
     }
   }
 };