client.api.applications(client.user.id).guilds('711249925349965864').commands.post({
  data: {
    "name": "photo",
    "description": "Send a random adorable animal photo!",
    "options": [{
      "name": "cat",
      "description": "Send a random adorable cat photo",
      "type": 1,
      "options": [{
        "name": "breed",
        "description": "la razza di gatto che vuoi vedere",
        "type": 3,
        "required": false,
        "choices": [{
          "name": "Devon_Rex",
          "value": "drex"
                      }, {
          "name": "Abyssinian",
          "value": "abys"
                      }, {
          "name": "Sphinx",
          "value": "sphy"
                      }, {
          "name": "Scottish_Fold",
          "value": "sfol"
                      }, {
          "name": "American_Shorthair",
          "value": "asho"
                      }, {
          "name": "Maine_Coon",
          "value": "mcoo"
                      }, {
          "name": "Persian",
          "value": "pers"
                      }, {
          "name": "British_Shorthair",
          "value": "bsho"
                      }, {
          "name": "Ragdoll",
          "value": "ragd"
                      }, {
          "name": "Exotic_Shorthair",
          "value": "esho"
                      }]
                  }]
              }, {
      "name": "dog",
      "description": "Send a random adorable dog photo",
      "type": 1,
      "options": [{
        "name": "breed",
        "description": "La razza di cane che vuoi vedere",
        "type": 3,
        "required": false,
        "choices": [{
          "name": "Labrador_Retriever",
          "value": "149"
                      }, {
          "name": "German_Shepherd",
          "value": "115"
                      }, {
          "name": "Golden_Retriever",
          "value": "121"
                      }, {
          "name": "French_Bulldog",
          "value": "113"
                      }, {
          "name": "Poodle",
          "value": "196"
                      }, {
          "name": "Beagle",
          "value": "31"
                      }, {
          "name": "Rottweiler",
          "value": "210"
                      }, {
          "name": "German_Shorthaired_Pointer",
          "value": "116"
                      }, {
          "name": "Pembroke_Welsh_Corgi",
          "value": "184"
                      }]
                  }]
              }]
  }
}).then(status => {
  console.log(status)
});


new Discord.MessageEmbed()
  .setColor('#0099ff')
  .setTitle('Some title')
  .setURL('https://discord.js.org/')
  .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
  .setDescription('Some description here')
  .setThumbnail('https://i.imgur.com/wSTFkRM.png')
  .addFields({ name: 'Regular field title', value: 'Some value here' }, { name: '\u200B', value: '\u200B' }, { name: 'Inline field title', value: 'Some value here', inline: true }, { name: 'Inline field title', value: 'Some value here', inline: true }, )
  .addField('Inline field title', 'Some value here', true)
  .setImage('https://i.imgur.com/wSTFkRM.png')
  .setTimestamp()
  .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

module.exports = {
  name: 'name',
  description: '',
  async execute(message, args, client, db) {
    try {
      
    } catch (err) {
      console.log(err);
    }
  }
};