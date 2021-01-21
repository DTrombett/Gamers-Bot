module.exports = {
    name: 'meme',
    description: "",
    execute(interaction, options, client, db) {
      try {
      const boolean = Math.random() < 0.5;
      var number;
      var meme;
      if(boolean) {
        meme = ["https://i.imgflip.com/31gy6j.jpg", "http://memeville.weebly.com/uploads/1/7/5/6/17560407/6884621_orig.jpg", "http://memeville.weebly.com/uploads/1/7/5/6/17560407/1710179.jpg", "http://creativeedtech.weebly.com/uploads/4/1/6/3/41634549/summer_orig.png", "http://creativeedtech.weebly.com/uploads/4/1/6/3/41634549/summer_orig.png", "http://myriamsmemeoftheday.weebly.com/uploads/7/7/8/8/77889656/img-0166_orig.gif", "http://myriamsmemeoftheday.weebly.com/uploads/7/7/8/8/77889656/img-0171_1.gif", "https://imgflip.com/i/31k7kk", "https://cdn.weeb.sh/images/B1VVWuaFf.jpeg", "https://images.app.goo.gl/njyqD6L2dJ1m3qX19", "https://images.app.goo.gl/WLLbBKmbWZwsFLqh7", "https://cdn.studyinternational.com/news/wp-content/uploads/2019/01/nqvj9p79u3b11.jpg", "https://images.app.goo.gl/toF7YENA2CizTUU66", "https://images.app.goo.gl/RciQsdXDhhtesNPw5", "https://images.app.goo.gl/wMPqmojcPunnuQDZA", "https://i.redd.it/6sdynfocd5t21.jpg", "https://i.redd.it/lw1wuyejxno11.png", "https://i.redd.it/r2y48i85udf21.jpg", "https://i.redd.it/ufy03o502zt21.jpg", "https://i.redd.it/swb5jpktmeo21.jpg", "https://i.redd.it/s8ceezjrx7m11.jpg", "https://i.redd.it/gjve7jgp7ct11.jpg", "https://i.redd.it/evwcs9gurn811.jpg", "https://cdn.discordapp.com/attachments/577901961635168286/612231591133184011/JPEG_20190812_150054.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679874960130130/Screenshot_20200830_191113.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679874678980668/Screenshot_20200830_190941.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679874435973220/Screenshot_20200830_190550.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679715991945256/Screenshot_20200830_185130.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679715710795836/Screenshot_20200830_185056.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679715152953474/Screenshot_20200830_184515.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679523619930273/Screenshot_20200830_182154.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679523204825239/Screenshot_20200830_182121.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679522881863720/Screenshot_20200830_182100.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679522630074478/Screenshot_20200830_172555.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679525591253002/Screenshot_20200830_183542.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679525255970916/Screenshot_20200830_183504.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679524957913108/Screenshot_20200830_183443.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679524693803139/Screenshot_20200830_183130.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679524257464480/Screenshot_20200830_182531.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679523989160046/Screenshot_20200830_182501.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679713739472976/Screenshot_20200830_183813.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679713475362896/Screenshot_20200830_183625.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679713194213406/Screenshot_20200830_183610.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679714863415498/Screenshot_20200830_184050.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679714393784470/Screenshot_20200830_183959.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/749679714032943224/Screenshot_20200830_183850.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/752165053129687040/Screenshot_20200906_011203.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/752165053607837736/Screenshot_20200906_011341.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/752165055684149278/Screenshot_20200906_011603.jpg", "https://cdn.discordapp.com/attachments/712585735999586324/752165226429808710/20200906_012403-1.jpg", 'https://cdn.discordapp.com/attachments/722418785822441532/793464982935175198/memetemp.png'];
         number = Math.floor(Math.random() * meme.length);
         meme = meme[number];
      } else {
          number = Math.round(Math.random() * 500);
          meme = `https://ctk-api.herokuapp.com/meme/${number}`;
        }
        client.api.interactions(interaction.id, interaction.token).callback.post({data: {
       type: 4,
       data: {
       content: meme
        }
       }
      });
      } catch (err) {
        console.log(err, interaction);
      }
    }};