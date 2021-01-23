const { inspect } = require('util');

module.exports = {
  name: 'INTERACTION_CREATE',
  description: '',
  execute(interaction, client, db) {
    try {
      var options = interaction.data.options;
      if (client.slashCommands.has(interaction.name)) client.slashCommands.get(interaction.data.name).execute(interaction, options, client, db);
      else console.log('Interaction created without slash command');
    } catch (err) {
      console.log(err);
    }
  }
};