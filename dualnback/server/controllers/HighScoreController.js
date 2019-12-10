var mongoose = require('mongoose');

var Highscore = mongoose.model('HighScore');

module.exports.addHighScore = (req, res, next) => {
    var highscore = new Highscore();

    highscore.currentHighScore = req.body.currentHighScore;
    highscore.save((err, doc) => {
        if (!err){
            res.send(doc);
        }
        else {
            if (err.code == 11000) {
                res.status(422).send(['Workout exists']);
            }
            else {
                return next(err);
            }
        }
    });
}


module.exports.showHighScore = (req, res, next) => {
    Workout.find((err, highscores)=>{
    if (!highscores)
        return res.status(404).json({ status: false, message: 'No workouts found' });
    else
        return res.status(200).json({ status: true, highscores});
    });
};
