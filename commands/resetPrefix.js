var commandObject = {
  name: 'resetprefix',
  description: 'Reimposta il prefisso nel server!',
  help: 'Cancella tutti i prefissi impostati nel server! Potrai continuare ad usare il prefisso predefinito `-` o menzionare il bot.',
  aliases: ['reset'],
  time: 2000,
  execute: (message, args, client, prefix) => {
    try {
      if (!message.member.permissions.has('MANAGE_SERVER'))
        return message.channel.send('Mi displiace ma non hai abbastanza permessi per utilizzare questo comando!')
          .catch(console.error);
      client.resetVar('prefix', 'id', message.guild.id);
      return message.channel.send(`Fatto! Ho resettato tutti i prefissi nel server!`)
        .catch(console.error);
    } catch (err) {
      client.error(err, message);
    }
  }
};

module.exports = commandObject;