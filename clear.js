 module.exports = {
    name: 'clear',
    description: "Cancella dei messaggi nella chat!",
   async execute(message, args, client, db, findMember) {
    try{
      await message.delete();
      if (!args[0]) return message.reply("Devi scrivere quanti messaggi vuoi eliminare!");
      if(isNaN(args[0])) return message.reply("Scrivi un numero!");
      if(args[0] > 100) return message.reply("Puoi cancellare fino a 100 messaggi!");
      if(args[0] < 1) return message.reply("Devi cancellare almeno un messaggio");
      var count = 0;
      await message.channel.bulkDelete(args[0], true)
      .then(ms => count = ms.size);
      var msg = 'Ho cancellato con successo ' + count + ' messaggi!';
    if(count != args[0]) msg = msg + `\nAltri ${args[0] - count} non sono stati cancellati perché scritti più di 2 settimane fa.`
    message.reply(msg)
    .then(msg => {
    msg.delete({ timeout: 3000 });
  })
  .catch(console.error);
    } catch (err) {
      console.error(err, message)
    }
 }
}