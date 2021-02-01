module.exports = {
  name: 'invalidated',
  
  execute: function(client) {
    try {
      console.log('Client session is invalidated! Exiting the process...');
      process.exit('Bot session invalidated!');
    } catch (err) {
      console.log(err);
    }
  }
};