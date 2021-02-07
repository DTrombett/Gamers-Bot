const { inspect } = require('util');

module.exports = {
  name: 'INTERACTION_CREATE',
  execute: function(interaction, client) {
    console.log(`New interaction created! Interaction: ${inspect(interaction)}`);
  }
};