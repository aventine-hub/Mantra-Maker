var mongoose = require('mongoose');

var mantraSchema = new mongoose.Schema({
    text: String
}, {
    timestamps: true
});

var makerSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    mantras: [mantraSchema],
    googleId: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Maker', makerSchema);