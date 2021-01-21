module.exports = {
    name: 'shardDisconnect',
    description: '',
    execute(event, shardID, client, db) {
      try {
        console.log(`Shard ${shardID} disconnected! Event: ${event} `, `Trying to reconnect...`);
      } catch (err) {
        console.log(err);
      }
    }};