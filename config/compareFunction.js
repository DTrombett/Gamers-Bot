const normalize = require('./normalize');

module.exports = (a, b) => {
    if ([normalize(a.user.tag), normalize(b.user.tag)].sort()[0] == normalize(a.user.tag))
        return -1;
    return 1;
}