module.exports = {
    name: 'unmute',
    description: "Smuta un membro",
    execute(message, args){
        const target = message.mentions.users.first();
        if(target){
            let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');

            let memberTarget= message.guild.members.cache.get(target.id);

            memberTarget.roles.remove(muteRole.id);
            message.channel.send(`<@${memberTarget.user.id}> è stato smutato!`);
        } else{
            message.channel.send('Non ho trovato questo membro!');
        }
    }
};