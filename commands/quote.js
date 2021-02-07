const { cleanContent, removeMentions } = require('discord.js').Util;

function notFound(message) {
  return message.channel.send('Non ho trovato questo messaggio all\'interno del server')
    .catch(console.error);
}
function rejected(message) {
  return message.channel.send('Si è verificato un errore durante l\'elaborazione della richiesta! Per favore controlla i miei permessi!')
    .catch(console.error);
}
function wrongUsage(message, prefix) {
  return message.channel.send(`Attenzione! Usa così il comando: \`${prefix}quote ID (#canale | ID)\` o \`${prefix}quote [link]\``)
    .catch(console.error);
}

module.exports = {
  name: 'quote',
  description: 'Cita un messaggio nel server!',
  help: 'Vuoi riportare il testo di un messaggio nel server? Puoi farlo con questo comando! Basta inserire il link o l\'ID messaggio.',
  usage: ' {link | ID}',
  aliases: [],
  examples: [' https://discord.com/channels/781085699487039520/787647474402983937/787647592443019304', ' 787647592443019304', ' #testing 787647592443019304'],
  time: 5000,
  execute: async function(message, args, client, prefix) {
    try {
      if (!message.guild.available) return client.error('Guild is unavailable', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!args[0]) return wrongUsage(message, prefix);
      const link = `https://discord.com/channels/${message.guild.id}/`;
      var quoted;
      var channel;
      if (args[0].startsWith(link) && args[0].replace(link, '').length == 37) {
        var splitted = args[0].replace(link, '').split('/');
        if (isNaN(splitted[1]) || isNaN(splitted[0]) || splitted.length != 2 || splitted[0].length != splitted[1].length) return wrongUsage(message, prefix);
        channel = message.guild.channels.cache.get(splitted[0]);
        if (!channel) return notFound(message);
        quoted = await channel.messages.fetch(splitted[1])
          .catch(console.error);
        if (!quoted) return notFound(message);
      } else {
        if (args[0].length != 18 || isNaN(args[0]) || args[1] && isNaN(args[1])) return wrongUsage(message, prefix);
        var id;
        channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.get(args[1]);
        if (!channel && args[1]) return wrongUsage(message, prefix);
        if (!channel) channel = message.channel;
        quoted = await channel.messages.fetch(args[0])
          .catch(console.error);
        if (!quoted) quoted = await channel.messages.fetch(args[1])
          .catch(console.error);
        if (!quoted) return notFound(message);
      }
      if (!quoted.member) return notFound(message);
      if (!quoted.member.displayName) return client.error('displayName of member undefined', message) && message.channel.send('Si è verificato un errore!')
        .catch(console.error);
      if (!quoted.content && !quoted.embeds[0]) return message.channel.send('Non puoi citare questo tipo di messaggi!');
      message.delete()
        .catch(console.error);
      const webhooks = await message.channel.fetchWebhooks()
        .catch(err => client.error(err, message));
      if (!webhooks) return rejected(message);
      var webhook = webhooks.first();
      var options = new Map();
      var embeds = [quoted.embeds[0]];
      var msg = removeMentions(cleanContent(quoted.content, quoted));
      var username = quoted.member.displayName;
      var avatarURL = quoted.author.displayAvatarURL({
        dynamic: false,
        format: 'png',
        size: 4096
      });
      if (!username || !avatarURL) return client.error('Error fetching user data.', message) && rejected(message);
      if (!msg) return client.error('Cannot get quoted content.', message) && rejected(message);
      options.set('username', username);
      options.set('avatarURL', avatarURL);
      if (embeds[0]) options.set('embeds', embeds);
      if (!webhook) {
        webhook = await message.channel.createWebhook(username, avatarURL)
          .catch(err => client.error(err, message));
        if (!webhook) return rejected(message);
      }
      webhook.send(msg, Object.fromEntries(options))
        .catch(err => client.error(err, message) && rejected(message));
    } catch (err) {
      client.error(err, message);
    }
  }
};