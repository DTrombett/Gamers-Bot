const normal = require('normalize-strings');

module.exports = (text) => {
    let regex = new RegExp('_', 'g');
    let regex1 = new RegExp('-', 'g');
    return normal(text).toLowerCase().split(/ +/).join(' ').replace(regex, ' ').replace(regex1, '').split('|').join('');
}