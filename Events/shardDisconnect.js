module.exports = {
    name: 'shardDisconnect',
    description: '',
    execute(event, shardID, client, db) {
      try {
        console.log(`${shardID} disconnected! Event: ${event} Trying to reconnect...`);
        db.get('token').then(value => {
          client.login(value).then(() => {
            console.log('Bot successfully reconnected!');
            });
            });
      } catch (err) {
        console.log(err);
      }
    }};