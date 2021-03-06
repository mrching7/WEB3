import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import './Home.css';
import Game from './Game';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { clearErrors } from '../../actions/errorActions';

import logo from './logo.svg';

export interface IState {
  gameRunning: boolean;
  gridSize: number;
  score: number;
  highS: number;
}

class Home extends React.Component<{}, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
      gameRunning: false,
      gridSize: 3,
      score: 0,
      highS: 0
    };

    //this.setGridSize = this.setGridSize.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onScoreChange = this.onScoreChange.bind(this);
  }

  render() {
    return (

      <div className="App">
        <Container>
          <Row>
            <Col xs="3"></Col>

            <Col xs="6" >
              <Button className={this.state.gameRunning ? 'hidden' : 'playbtn'} onClick={this.onPlay}>Play</Button>
              <Button className={!this.state.gameRunning ? 'hidden' : 'playbtn'} onClick={this.onPause}>Pause</Button>
              
              <Game rows={this.state.gridSize} columns={this.state.gridSize} running={this.state.gameRunning} onScoreChange={this.onScoreChange} />
            </Col>

            <Col xs="3"></Col>


          </Row>
          <Row>

            <Col xs="3"></Col>

            <Col xs="6" >
            <p className="scoreSpace">
              <span className="score">Currentscore: </span>
              {this.state.score}

              <br></br>

              <span className="score">Highscore: </span>
              {this.state.highS}
            </p>
            </Col>

            <Col xs="3"></Col>

          </Row>
        </Container>
      </div>
    );
  }

  private onPlay(e: any) {
    this.setState({ gameRunning: true });
  }

  private onPause(e: any) {
    this.setState({ gameRunning: false });
  }

  private onScoreChange(prevScore: number, nextScore: number, highScore: number) {
    this.setState({ score: nextScore, highS: highScore});
  }
}

export default connect()(Home);
