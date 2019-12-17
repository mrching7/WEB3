import Flash from "./Flash";
import * as _ from "lodash";
import * as React from 'react';

class Board extends React.Component{

    public onScoreChange?: (prevScore: number, nextScore: number, highScore: number) => void;
    private timerToken?: number;
    private onFlash?: (flash: Flash) => void;
    private readonly history: Flash[];
    private score: number;
    private highscore: number;
    private ws!: WebSocket;

    constructor(public readonly rows: number, public readonly columns: number, props?:any) {
        super(props);
        this.history = [];
        this.score = 0;
        this.highscore = 0;
    }

    public start(onFlash: (flash: Flash) => void) {
        this.onFlash = onFlash;

        this.timerToken = window.setInterval(() => onFlash(this.next()), 2500);
    }

    public stop() {
        clearInterval(this.timerToken)
        delete this.timerToken;
        delete this.onFlash;
    }

    public samePosition() {
        if (this.history.length > 1 && _.isEqual(this.history[this.history.length - 1].position, this.history[this.history.length - 2].position)) {
            this.updateScore(100);
        }
        else{
            this.updateScore(-50);
        }
    }

    public sameSound() {
        if (this.history.length > 1 && _.isEqual(this.history[this.history.length - 1].sound, this.history[this.history.length - 2].sound)) {
            this.updateScore(100);
        }
        else{
            this.updateScore(-50);
        }
    }

    public updateScore(delta: number){
        const newScore: number=this.score+delta;
        if(this.onScoreChange){
            if(this.highscore < newScore){
                this.highscore = newScore;
                this.onScoreChange(this.score, newScore, this.highscore);
                // this.state.websocket.send(this.highscore.toString);    
            }
            else{
                this.onScoreChange(this.score, newScore, this.highscore);
            }

        }
        this.score=newScore;
    }

    public randomInRange(min: number, max: number){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

    public next(){
        const p: number=15;
        const nextFlash: any = {};

        if(this.history.length>0 && this.randomInRange(1,100)<= p){
            nextFlash.position=this.history[this.history.length-1].position;
        }else{
            const randomRow = this.randomInRange(0, this.rows - 1);
            const randomColumn= this.randomInRange(0, this.columns-1 );
            nextFlash.position=[randomRow, randomColumn];
        }

        if (this.history.length > 0 && this.randomInRange(1, 100) <= p) {
            nextFlash.sound = this.history[this.history.length - 1].sound;
        } else {
            const randomSound = this.randomInRange(1, 9);
            nextFlash.sound = randomSound;
        }

        this.history.push(nextFlash);
        return nextFlash;

    }
}




export default Board;