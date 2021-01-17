module.exports = {
    name: 'reboot',
    description: "",
    async execute(message, args, Discord, client, prefix, fs, db, command) {
      try {
        if(message.author.id != '597505862449496065') return;
        const date1 = Date.now();
        await message.channel.send('Reboot iniziato!');
        await client.destroy();
        await db.get('token').then(async value => {
          await client.login(value);
        });
        message.channel.send(`Reboot completato! Took **${Math.round(Date.now() - date1)}ms**`);
      } catch (err) {
        console.log(err);
      }
    }}