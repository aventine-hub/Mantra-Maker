const Maker = require('../models/maker');

module.exports = {
    index,
    addMantra,
    delMantra
};

function index(req, res, next) {
    console.log(req.query)
    // Make the query object to use with Maker.find based up
    // the user has submitted the search form or now
    let modelQuery = req.query.name ? { name: new RegExp(req.query.name, 'i') } : {};
    // Default to sorting by name
    let sortKey = req.query.sort || 'name';
    Maker.find(modelQuery)
        .sort(sortKey).exec(function (err, makers) {
            if (err) return next(err);
            // Passing search values, name & sortKey, for use in the EJS
            res.render('makers/index', { makers, name: req.query.name, sortKey });
        });
}

function addMantra(req, res, next) {
    //Remember: req.user is the logged in user's Mongoose document!
    req.user.mantras.push(req.body);
    req.user.save(function (err) {
        res.redirect('/makers');
    });
}

function delMantra(req, res, next) {
    Maker.findOne({ 'mantras._id': req.params.id }, function (err, maker) {
        maker.mantras.id(req.params.id).remove();
        maker.save(function (err) {
            res.redirect('/makers');
        });
    });
}