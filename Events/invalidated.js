module.exports = {
    name: 'invalidated',
    description: '',
    async execute(client, db) {
      try {
        console.log('Client session is invalidated! Bot is trying to restart...')
        await client.destroy()
        console.log('Bot successfully disconnected!');
        db.get('token').then(value => {
          client.login(value).then(() => {
            console.log('Bot successfully rebooted!');
            });
            });
      } catch (err) {
        console.log(err);
      }
    }}