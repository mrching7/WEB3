var mongoose = require('mongoose');


var Score = mongoose.model('Score');

module.exports.addScore = (req, res, next) => {
    var _score = new Score();

    _score.user = req.body.user;
    _score.score = req.body.score;

    _score.save((err, highScore) => {
        if (!err){
            res.status(201).send(highScore);
        }
        else {
            res.status(401).send('failed to create new location')
        }
    });
}

module.exports.showScore = (req, res, next) => {
    Score.find((err, highscores)=>{
    if (!highscores)
        return res.status(404).json({ status: false, message: 'No scores find'});
    else
        return res.status(200).json({ status: true, highscores});
    });
};


