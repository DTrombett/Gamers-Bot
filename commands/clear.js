async function clearMessages(i, message) {
  var count;
  await message.channel.messages.fetch({ limit: i}).then(async messages =>{
    await message.channel.bulkDelete(messages, true)
    .then(msgs => count = msgs.size)
    .catch(console.error);
  });
  return count;
}

module.exports = {
    name: 'clear',
    description: "Cancella dei messaggi nella chat!",
   async execute(message, args, client, db, findMember) {
    await message.delete();
    if (!args[0]) return message.reply("Devi scrivere quanti messaggi vuoi eliminare!");
    if(isNaN(args[0])) return message.reply("Scrivi un numero!");
    if(args[0] > 1000) return message.reply("Puoi cancellare fino a 100 messaggi!");
    if(args[0] < 1) return message.reply("Devi cancellare almeno un messaggio");
    var count = 0; var error;
    for(var i = args[0]; i > 0; i-= 100) {
      count+= await clearMessages(i, message)
      .catch(err => error = err);
      if(error) i = 0;
    }
    var msg = 'Ho cancellato con successo ' + count + ' messaggi!';
    if(count != args[0]) msg = msg + `\nAltri ${args[0] - count} non sono stati cancellati perché scritti più di 2 settimane fa.`
    message.reply(msg)
    .then(msg => {
    msg.delete({ timeout: 3000 });
  })
  .catch(console.error);
 }
}