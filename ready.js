module.exports = {
  name: 'ready',
  description: '',
  execute(client, db) {
    try {
      console.log(`Logged in as ${client.user.tag}`);
      require('../config/functions.js')(client, db);
    } catch (err) {
      console.log(err);
    }
  }
};