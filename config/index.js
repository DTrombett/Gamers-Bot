/// <reference path="index.d.ts" />

const { automod } = require("./autoMod");
const Command = require('./Command');
const Covid = require("./CovidData");
const covidUtil = require('./covidUtil');
const covidImages = require('./covidImages');
const cursedWords = require("./cursedWords");
const fetchCovidData = require("./fetchCovidData");
const findMember = require("./findMember");
const gitHubApi = require("./gitHubApi");
const postStatus = require("./postStatus");
const variables = require("./variables");
const Video = require("./Video");
const wait = require("./wait");

module.exports = {
    autoMod: automod,
    Command: Command,
    covidUtil: covidUtil,
    Covid: Covid,
    covidImages: covidImages,
    cursedWords: cursedWords,
    fetchCovidData: fetchCovidData,
    findMember: findMember,
    gitHub: gitHubApi,
    postStatus: postStatus,
    variables: variables,
    Video: Video,
    sleep: wait
}