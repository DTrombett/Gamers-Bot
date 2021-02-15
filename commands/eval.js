const { MessageAttachment, MessageEmbed, Util } = require('discord.js');
const { inspect } = require('util');
const format = require('dateformat');

var commandObject = {
  name: 'eval',
  execute: async (message, args, client, prefix) => {
    if (message.author.id != '597505862449496065')
      return;
    try {
      message.delete();
      var code = args.join(' ');
      if (!code)
        return message.channel.send('Scrivi un codice');
      var evaled = await eval(code);
      var type = typeof evaled;
      if (typeof evaled == 'object')
        evaled = inspect(evaled);
      if (typeof evaled == 'function')
        evaled = evaled.toString();
      if (typeof evaled == 'undefined')
        evaled = 'undefined';
      if (typeof evaled != 'string')
        evaled = evaled.toString();
      if (!evaled)
        evaled = 'undefined';
      if (evaled.length > 2038) {
        const buffer = Buffer.from(evaled, 'utf8');
        let form = type == 'object' || type == 'function' ? 'js' : 'txt';
        var attachment = new MessageAttachment(buffer, `eval-${format(Date.now(), 'dd-mm-yy_HH-MM-ss')}.${form}`);
        message.channel.send(`Hai generato un testo di **${evaled.length}** caratteri che non è visualizzabile nell'embed! Controlla la console per i risultati o scarica il file qui sotto...`, attachment);
        return console.log(evaled);
      }
      if (code.length > 1014)
        code = code.slice(0, code.length - 1014);
      const newEmbed = new MessageEmbed()
        .setColor('#000001')
        .setAuthor('Eval')
        .setTitle('Output')
        .setDescription('```xl\n' + Util.cleanCodeBlockContent(evaled) + '```')
        .addFields({ name: 'Input', value: '```js\n' + code + '```' }, { name: 'Type', value: '```\n' + type + '```' });
      message.channel.send(newEmbed);
      console.log(evaled);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${Util.cleanCodeBlockContent(err.toString())}\n\`\`\``);
      console.log(err);
    }
  }
};

module.exports = commandObject;