const { scheduleJob } = require("node-schedule");
const { client } = require("..");
const { setCursedWords } = require("../config/cursedWords");
const gitHubApi = require("../config/gitHubApi");
const fetchCovidData = require("./fetchCovidData");

module.exports = async () => {
    try {
        console.log(`Logged in as ${client.user.tag}`);
        gitHubApi('repos/web-mech/badwords/contents/lib/lang.json')
            .then(({ content }) => setCursedWords(JSON.parse(Buffer.from(content, 'base64').toString()).words))
            .catch(console.error);
        fetchCovidData();
        scheduleJob('0 18 * * *', fetchCovidData);
    } catch (err) {
        console.error(err);
    }
}