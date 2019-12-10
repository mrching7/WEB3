import React, {Component} from 'react'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import HighS from "./Board"

var client=new W3CWebSocket('ws://localhost:3030');


class App extends Component{
    constructor(props?: any, highscore?: any){
        super(props);
    }

    ws=new WebSocket('ws://localhost:3030');

    componentDidMount(){
        this.ws.onopen=()=>{
            //opretter forbindelse med en simpel besked
            console.log('Connection started')
        }

        this.ws.onmessage=evt=>{
            //gemmer data fra serveren i const message
            const message=JSON.parse(evt.data);
        }

        this.ws.onclose=()=>{
            //hvis forbindelsen forsvinder så opret ny forbindelse med nyt objekt
            console.log('Disconnected')
            this.setState({ws: new WebSocket('ws://localhost:3030'),})
        }
    }
    //send data til serveren på en eller anden måde
    public send(props: string){
        this.ws.send(props);
    }

    /*
    sendMessage=()=>{
        
        try{
            this.ws.send()
        }
        catch(error){
            console.log(error);
        }
        //this.ws.send(JSON.stringify(props.highscore));
    }
    */
}

export default App;


