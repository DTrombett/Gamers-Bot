const { MessageAttachment, MessageEmbed, Collection } = require('discord.js');
const { readdirSync, readFile } = require('fs');
const Zip = require('adm-zip');
const ms = require('ms');
const rimraf = require('rimraf');
const fetch = require('node-fetch');
const { Command } = require('../config');
const { getVar, setVar } = require('../config/variables');
const error = require('../config/error');
const { createWriteStream } = require('fs');
const { getHeapSnapshot } = require('v8');

const createHeapSnapshot = () => {
  const snapshotStream = getHeapSnapshot();
  const fileStream = createWriteStream(`./${Date.now()}.heapsnapshot`);
  snapshotStream.pipe(fileStream);
  return new Promise(resolve => snapshotStream.on('end', resolve));
}

const command = new Command('debug',

  async function (message, args, prefix) {
    try {
      if (message.author.id != '597505862449496065')
        return null;
      var date = Date.now();
      message.delete();
      switch (args[0].toLowerCase()) {
        case 'uptime':
          return message.channel.send(ms(message.client.uptime));
        case 'backup':
          function getDirectories(source) {
            return readdirSync(source, { withFileTypes: true })
              .filter(dirent => {
                return dirent.isDirectory();
              })
              .map(dirent => {
                return dirent.name;
              })
              .filter(dirent => {
                return !dirent.startsWith('.');
              })
              .filter(dirent => {
                return !['node_modules', 'variables', 'backup'].includes(dirent);
              });
          }
          var attachments = [];
          for (let dir of getDirectories('./')) {
            let zip = new Zip();
            zip.addLocalFolder(`./${dir}`);
            zip.writeZip(`./backup/${dir}.zip`);
            let att = new MessageAttachment(`./backup/${dir}.zip`, dir + '.zip');
            attachments.push(att);
          }
          message.channel.send(`Backup completed! Took **${Date.now() - date}ms**`, attachments);
          rimraf('./backup', () => console.log('Backup completed and files deleted. ', `Took ${Date.now() - date}`));
          break;
        case 'fetch':
          message.delete();
          var text;
          var json;
          /** @type {string[]} */
          var errors = [];
          var attachment;
          await fetch(args[2]).then(async (res) => {
            if (!res.ok) {
              message.channel.send('Failed!');
              return console.log(res);
            }
            switch (args[1].toLowerCase()) {
              case 'text':
                text = await res.text()
                  .catch(err => {
                    console.error(err);
                    errors.push('text');
                  });
                if (!errors.includes('text'))
                  attachment = new MessageAttachment(Buffer.from(text), 'fetched.html');
                break;
              case 'json':
                json = await res.json()
                  .catch(err => {
                    console.error(err);
                    errors.push('json');
                  });
                if (!errors.includes('json'))
                  attachment = new MessageEmbed()
                    .setDescription('Check the console for results!');
                console.log(json);
                break;
              default:
                return message.channel.send('Invalid options!');
            }
            if (attachment)
              return message.channel.send(`Success! Took **${Date.now() - message.createdTimestamp}ms**`, attachment);
            return message.channel.send('Failed to parse!');
          });
          break;
        case 'sendfile':
          const file = args[1];
          message.channel.send({
            files: [{
              attachment: file,
              name: file,
            }]
          })
            .catch(err => {
              console.log(err);
              message.channel.send('File not found!');
            });
          break;
        case 'sendtextfile':
          readFile(args[1], 'utf8', function (err, data) {
            if (err) {
              message.channel.send('File not found');
              throw err;
            }
            message.channel.send('\`\`\`js\n' + data + '\`\`\`');
          });
          break;
        case 'sendmessage':
          message.delete();
          args.shift();
          let channel = message.client.channels.cache.find(c => c.toString() == args[0]) || message.client.channels.cache.find(c => c.id == args[0]) || message.client.channels.cache.find(c => c.name == args[0]);
          if (!channel)
            channel = message.channel;

          else
            args.shift();
          channel.send(args.join(' '));
          break;
        case 'ram':
          let used = process.memoryUsage().heapUsed / 1024 / 1024;
          used = Math.round(used * 100) / 100 + 'MB';
          message.channel.send(used);
          break;
        case 'man':
          let man = !message.client.manteinance;
          message.client.manteinance = man;
          if (man)
            await message.client.user.setPresence({
              status: 'idle',
              activity: {
                name: 'Maintenance!',
                type: 'WATCHING',
              }
            });
          else
            await message.client.user.setPresence({
              status: 'online',
              activity: {
                name: '-help',
                type: 'LISTENING',
              }
            });
          message.channel.send('Fatto!');
          break;
        case 'heapdump':
          const sent = message.channel.send('Creating heap dump...');
          await createHeapSnapshot();
          sent.then(m => m.edit('Done!'));
          break;
        case 'reload':
          const sent1 = message.channel.send('Sto ricaricando i comandi...'), date1 = Date.now(), commands = await message.client.loadCommands();
          const date2 = Date.now();
          sent1.then(m => m.edit(`Fatto! Ho impiegato **${date2 - date1}ms**. Controlla la console per tutti i comandi.`));
          console.log(commands);
          break;
        default:
          message.client.commands.get('eval').execute(message, args, message.client, prefix);
      }
    } catch (err) {
      error(err, message);
    }
  })
  .addAlias('try', 'test');

module.exports = command;