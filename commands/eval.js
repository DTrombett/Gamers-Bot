const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
};

module.exports = {
    name: 'eval',
    description: "Try",
    execute(message, args, Discord, client, prefix, fs, Database, db, commandFiles, command) {if (message.author.id !== '597505862449496065') return;
    try {
      message.delete();
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      const newEmbed = new Discord.MessageEmbed()
        .setColor('#000001')
        .setAuthor('Eval')
        .setTitle('Input')
        .setDescription('\`\`\`js\n' + message.content.slice(6) + '\`\`\`')
        .addFields(
            {name:'Output', value: '\`\`\`xl\n' + clean(evaled) + '\`\`\`'},
            )
       message.channel.send(newEmbed);
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
   }
  };