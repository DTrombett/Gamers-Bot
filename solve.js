const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'solve',
  description: '',
  execute(message, args, client, db) {
    try {
      if (message.author.id != '597505862449496065' || !args[0]) return;
      var embed = new MessageEmbed()
        .setAuthor(client.user.tag, client.customAvatar)
        .setTimestamp()
        .setFooter('Made by DTrombett')
        .setColor('RED')
        .setThumbnail(message.guild.iconURL({
          format: 'png',
          dynamic: true,
          size: 4096
        }));
      switch (args[0].toLowerCase()) {
        case "maxh":
          let i = args[1];
          if(isNaN(i)) i = args[1].replace(',', '.');
          i = parseFloat(i);
          if(isNaN(i)) return message.channel.send('Inavlid Number');
          let n = i.toString().split('.')[1];
          n = !!n ? n.length + 1 : 1;
          let t = 100 * i / 981;
          t = parseFloat(t.toFixed(n));
          let v = i * t;
          v = parseFloat(v.toFixed(n));
          let result = 9.81 * t * t / 2 + v;
          result = result.toFixed(n);
          embed
            .setTitle('Result')
            .setDescription('```\n' + result + '```')
            .addField('Procedimento', `\`\`\`\nv = ${i}\nt = 100 * ${i} / 981 = ${t}\ns = 9,81 * t² / 2 + v * t =\n= 9,81 * ${t}² / 2 + ${i} * ${t} =\n= ${(9.81 * t * t / 2).toFixed(n)} + ${i * t} = ${result}\`\`\``);
          break;
        default:
          embed.setDescription('Nessuna operazione corrispondente!');
      }
      message.channel.send(embed);
    } catch (err) {
      console.log(err, message);
    }
  }
};