module.exports = (req, res) => {
    res.render('errors/err-404', {
        title: '404'
    });
}