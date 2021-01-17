function type(link) {
  if(link.startsWith('http')) return 'http';
  if(link.startsWith('https')) return 'https';
}

module.exports = {
    name: 'edit',
    description: "description",
    async execute(message, args, Discord, client, prefix, fs, db, command) {
      try {
        if(message.author.id !== '597505862449496065') return;
        const attachment = message.attachments.first();
        const https = require(type(attachment.attachment));
        if(!args[0]) {
          args == ['/'];
        } else {
          args == [args[0] + '/']
        }
        const file = fs.createWriteStream(`.${args[0]}/attachment.name`);
        db.get("token").then(value => {
        const request = https.get(attachment.attachment, function(response) {
         response.pipe(file);
         client.destroy()
         .then(() => {
           client.login(value);
         })
         .then(() => {
           message.channel.send(`Fatto! Ho modificato il file **${attachment.name}** e riavviato il bot per rendere effettive le modifiche!`)
         })
         .catch(err => {
           console.log(err);
         });
        });
        });
      } catch (err) {
        console.log(err);
      }
    }}