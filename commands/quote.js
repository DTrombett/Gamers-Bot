function clean(text) {
  if (typeof text === 'string')
  return text
  .replace(/@/g, '@' + String.fromCharCode(8203));
  else return text;
}
  
function getChannel(id, message) {
  channel = message.guild.channels.cache.get(id);
  return channel;
}

function notFound(message) {
  return message.channel.send('Non ho trovato questo messaggio all\'interno del server')
  .catch(err => console.log(err));
}

function rejected(message) {
  return message.channel.send('Si è verificato un errore durante l\'elaborazione della richiesta! Per favore controlla i miei permessi!')
  .catch(err => console.log(err));
}

function wrongUsage(message, prefix) {
  return message.channel.send(`Attenzione! Usa così il comando: \`${prefix}quote ID (#canale | ID)\` | \`${prefix}quote [link]\``)
  .catch(err => console.log(err));
}

module.exports = {
	name: 'quote',
	description: 'Cita un messaggio nel server!',
	async execute(message, args, Discord, client, prefix, fs, db, command) {
		try {
			if (!args[0]) return wrongUsage(message, prefix);
			const link = `https://discord.com/channels/${message.guild.id}/`;
			var quoted;
			var channel;
			if(args[0].startsWith(link) && args[0].replace(link, '').length == 37) {
			var splitted = args[0].replace(link, '').split('/');
			if(isNaN(splitted[1]) || isNaN(splitted[0]) || splitted.length != 2 || splitted[0].length != splitted[1].length) return wrongUsage(message, prefix);
			channel = getChannel(splitted[0], message);
			if(!channel) return notFound(message);
			quoted = await channel.messages.fetch(splitted[1])
			.catch(err => console.log(err));
			  if(!quoted) return notFound(message);
			} else {
			  if(args[0].length != 18 || isNaN(args[0]) || args[1] && isNaN(args[1])) return wrongUsage(message, prefix);
			   var id;
				 channel = message.mentions.channels.first() || getChannel(args[0], message) || getChannel(args[1], message);
				 if(!channel && args[1]) return wrongUsage(message, prefix);
				 if(!channel) channel = message.channel;
				 quoted = await channel.messages.fetch(args[0])
				 .catch(err => console.log(err));
				 if(!quoted) quoted = await channel.messages.fetch(args[1])
				 .catch(err => console.log(err));
				 if (!quoted) return notFound(message);
			}
			if(!quoted.member) return notFound(message);
			if(!quoted.content && !quoted.embeds[0]) return message.channel.send('Non puoi citare questo tipo di messaggi!');
			message.delete()
			.catch(err => console.log(err));
			const webhooks = await message.channel.fetchWebhooks()
			.catch(err => console.log(err));
			if(!webhooks) return rejected(message);
			var webhook = webhooks.first();
			var options = new Map();
			var embeds = [quoted.embeds[0]];
			var msg = clean(quoted.content);
			var username = quoted.member.displayName;
			var avatarURL = quoted.author.displayAvatarURL({
			  dynamic: false,
			  format: 'png',
			  size: 4096
			});
			options.set('username', username);
			options.set('avatarURL', avatarURL);
			if(embeds[0]) options.set('embeds', embeds);
			console.log(options);
			if (!webhook) {
			  webhook = await message.channel.createWebhook(name, avatar)
			  .catch(error => console.log(error));
			  if(!webhook) return rejected(message);
			}
			console.log(username, avatarURL);
			webhook.send(msg, Object.fromEntries(options))
			  .catch(error => {
			    console.log(error);
			    rejected(message);
			  });
		} catch (err) {
			console.log(err);
		}
	}
};