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
        return res.status(404).json({ status: false, message: ''});
    else
        return res.status(200).json({ status: true, highscores});
    });
};




var WebSocketServer=require('websocket').server;
var http=require('http');
var server=http.createServer(function(request, response){
    //håndtere http request ikke vigtigt da vi ikke laver httpreq
});
server.listen(1337, function() {
    console.log((new Date()) + " Server is listening on port " + 1337);
});
//lav serveren 
var wsserver=new WebSocketServer({
    httpServer: server
});
//websocket server
wsserver.on('request', function(request){
    console.log("Connection requested");
    var connection=request.accept(null, request.origin);
    //her vi håndterer request fra brugeren
    connection.on('message', function(message){
        if(message.type==='UTF8'){
            //håndtere websocket besked
        }
    });
    connection.on('close', function(connection){
        //luk forbindelsen
    })
});



