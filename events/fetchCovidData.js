const { default: fetch } = require("node-fetch");
const gitHubApi = require("../config/gitHubApi");
const { addColors, setCovidData } = require("../config/covid");
const { Stato } = require("../config/CovidData");

/**
 * Fetch and resolve data for covid in Italy
 * @returns {Stato} The fetched data
 */
async function fetchCovidData() {
    const colors = fetch('https://covid19.zappi.me/coloreRegioni.php')
        .then(a => a.json())
        .then(addColors)
        .catch(console.error);
    const italy = gitHubApi('repos/pcm-dpc/COVID-19/contents/dati-json/dpc-covid19-ita-andamento-nazionale-latest.json')
        .then(({ content }) => JSON.parse(Buffer.from(content, 'base64').toString()))
        .catch(console.error);
    const regioni = gitHubApi('repos/pcm-dpc/COVID-19/contents/dati-json/dpc-covid19-ita-regioni-latest.json')
        .then(({ content }) => JSON.parse(Buffer.from(content, 'base64').toString()))
        .catch(console.error);
    const province = gitHubApi('repos/pcm-dpc/COVID-19/contents/dati-json/dpc-covid19-ita-province-latest.json')
        .then(({ content }) => JSON.parse(Buffer.from(content, 'base64').toString()))
        .catch(console.error);
    return Promise.all([colors, italy, regioni, province])
        .then(a => setCovidData(a[1], a[2], a[3]))
        .catch(console.error);
}
module.exports = fetchCovidData;