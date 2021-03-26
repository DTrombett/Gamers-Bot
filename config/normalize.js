const normal = require('normalize-strings');

/**
 * Normalize a string.
 * @param {String} text
 * @returns {String} The normalized string
 */
module.exports = (text) => {
    let regex = new RegExp('_', 'g');
    let regex1 = new RegExp('-', 'g');
    return normal(text).toLowerCase().split(/ +/).join(' ').replace(regex, ' ').replace(regex1, '').split('|').join('');
}