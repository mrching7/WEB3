import React from 'react';

export interface IState {
    scores: string[];
}

class highscore extends React.Component<IState> {
    constructor(props: any) {
    super(props);
    this.state = {
        scores: ['','','','',''],
    };
}

public ws = new WebSocket('ws://localhost:4000/api');

componentDidMount(){
    this.connect();
}

connect(){
    this.ws = new WebSocket('ws://localhost:4000/api');
    
    this.ws.onopen = () => {
      console.log('connected websocket');
      this.ws.send('sending highscore from client');
    }

    this.ws.onmessage = s => {
        var data = JSON.parse(s.data);
        this.setState({scores: (data)});
    }

    this.ws.onclose = () => {
      console.log('websocket closed');
      //reconnect
      this.connect();
    }

    this.ws.onerror = () => {
      console.error("websocket connection error");
      this.ws.close();
    }
  }

  render(){
    return(
        <div>
            <ol>
            {this.state.scores.map(s => <li>{s}</li>)}
            </ol>
        </div>
    );
  }

}
export default highscore;