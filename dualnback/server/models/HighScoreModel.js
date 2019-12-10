//var Exercises=require('./exercise').schema;
var mongoose = require('mongoose');

var highScoreSchema = new mongoose.Schema({
    ID: number,
    currentHighScore: number
});

mongoose.model('HighScore', highScoreSchema);