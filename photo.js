module.exports = {
   name: 'photo',
   description: "",
   execute(interaction, options, client, db) {
     try {
     var value;
     if(options[0].name == 'cat') {
      const fetch = require('node-fetch');
      if(options[0].options) {
        value = `?breed_id=${options[0].options[0].value}&`;
      } else {
        value = '?';
      }
      fetch(`https://api.thecatapi.com/v1/images/search${value}size=full`, {
      headers: {
      'x-api-key' : '2d1a21c9-05b0-4204-8b0d-719b632940fd',
      }
     }).then(response => {
       response.json().then(data => {
       console.log(data);
       const url = data[0].url;
      client.api.interactions(interaction.id, interaction.token).callback.post({data: {
       type: 4,
       data: {
       content: url
        }
       }
      });
     });
    });
    } else {
    const fetch = require('node-fetch');
      if(options[0].options) {
        value = `?breed_id=${options[0].options[0].value}&`;
      } else {
        value = '?';
      }
      fetch(`https://api.thedogapi.com/v1/images/search${value}size=full`, {
      headers: {
      'x-api-key': 'e408875b-b51b-4e1c-a0f0-6324c7bedf89'
      }
     }).then(response => {
       response.json().then(data => {
       console.log(data);
       const url = data[0].url;
      client.api.interactions(interaction.id, interaction.token).callback.post({data: {
       type: 4,
       data: {
       content: url
        }
       }
      });
     });
    });
    }
   } catch (err) {
        console.log(err, interaction);
       }
    }};