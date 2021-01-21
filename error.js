module.exports = {
    name: 'error',
    description: '',
    execute(error, client, db) {
      try {
        console.log('Discord error occurred! ', error);
      } catch (err) {
        console.log(err);
      }
   }};