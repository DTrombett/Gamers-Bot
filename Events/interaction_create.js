const Discord = require('discord.js');

module.exports = {
    name: 'interaction_create',
    description: '',
    execute(interaction, client, inspect) {
      try {
        var options = interaction.data.options;
        console.log(`New interaction created! Interaction: ${inspect(interaction)}`);
        client.slashCommands.get(interaction.data.name).execute(interaction, options, Discord);
        const channel = client.channels.cache.get('789502153923624980');
        var msg = `**${interaction.member.user.username}#${interaction.member.user.discriminator}** ha usato il comando \`/${interaction.data.name}\` in <#${interaction.channel_id}> Link: https://discord.com/channels/${interaction.guild_id}/${interaction.channel_id}`;
        if (!options) return channel.send(msg);
        for (let option of options) {
          var msg = msg + `\nOpzione: **${option.name}**`;
          if (option.value) var msg = msg + `Scelta: **${option.value}**`;
          if (option.options) {
            var msg = msg + `\nOpzione: **${option.options[0].name}**`;
            if (option.options[0].value) var msg = msg + ` Scelta: **${option.options[0].value}**`;
            }
            }
            channel.send(msg);
      } catch (err) {
        console.log(err);
      }
    }};