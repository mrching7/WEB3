var mongoose = require('mongoose');

var scoreSchema = new mongoose.Schema({
    user: String,
    score: Number
});

mongoose.model('Score', scoreSchema);