module.exports = {
    name: 'invalidated',
    description: '',
    execute(client, db) {
      try {
        console.log('Client session is invalidated! Exiting the process...');
        process.exit('Bot session invalidated!');
      } catch (err) {
        console.log(err);
      }
    }};