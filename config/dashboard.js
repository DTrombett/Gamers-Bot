module.exports = (req, res) => {
    const path = req.url.split('/').slice(1);
    console.log(path);
    return res.redirect('https://discord.gg/uuHajVFAh5');
}