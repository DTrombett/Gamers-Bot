module.exports = {
    name: 'reactionrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client, channel, yellowTeamEmoji, blueTeamEmoji, yellowTeamRole, blueTeamRole) {
      
       const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "role1");
       
        const blueTeamRole = message.guild.roles.cache.find(role => role.name === "role2");
        
        const channel = '786210484168032386';
        
        const yellowTeamEmoji = '💛';
        
        const blueTeamEmoji = '💙';
        
        let embed = new Discord.MessageEmbed()
            .setColor('#ff00ff')
            .setTitle('Scegli un ruolo!')
            .setDescription('Scegli il colore che vuoi!\n\n'
                + `${yellowTeamEmoji} = giallo\n`
                + `${blueTeamEmoji} = blue`);
 
        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react(yellowTeamEmoji);
        messageEmbed.react(blueTeamEmoji);
        
        client.on('messageReactionAdd', async (reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(yellowTeamRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add(blueTeamRole);
                }
            } else {
                return;
            }
 
        });
 
        client.on('messageReactionRemove', async (reaction, user) => {
 
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;
 
 
            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(yellowTeamRole);
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove(blueTeamRole);
                }
            } else {
                return;
            }
        });
    }
};