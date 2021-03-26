const { default: fetch } = require("node-fetch");
const url = 'https://api.github.com/';
const token = `DTrombett:${process.env.GITHUB_TOKEN}`;

/**
 * Work with GitHub API.
 * @param {String} [path=''] - The path to send the request
 * @param {String} [method='GET'] - The method to use, one of `GET`, `POST`, `PUT`, `DELETE`. Default is `GET`
 * @param {Object} [body=null] - The body for the request
 * @returns {Promise<?Object>} The parsed JSON, if any.
 */
module.exports = async function gitHubApi(path = '', method = 'GET', body) {
    const response = await fetch(url + path, {
        method: method.toUpperCase(),
        body: JSON.stringify(body) || null,
        headers: {
            Authorization: `Basic ${Buffer.from(token).toString('base64')}`,
            Accept: 'application/vnd.github.v3+json',
            'Content-Type': 'application/json'
        },
    })
        .catch(console.error);
    if (!response) return null;
    if (response.ok) return await response.json() || null;
    throw new Error(`${method.toUpperCase()} request to ${path} returned ${response.status} status ${response.statusText}`);
}