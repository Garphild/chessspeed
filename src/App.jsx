import { hot } from 'react-hot-loader';
import React from 'react';
import './App.css';
import Chessboard from 'chessboardjsx';
import Chess from 'chess.js';

import games from './assets/GoringGambit';

const mygames = games.split(/\n\n\[/g).map((v) => (v[0] === '[' ? v : `[${v}`));

class App extends React.Component {
  game = new Chess();

  gameMoves = [];

  state = {
    currentMove: 0,
    position: 'start',
    currentGame: 0,
    headers: {},
    paused: false,
    movePause: 300,
  };

  constructor() {
    super();
    this.intervalFunction = this.intervalFunction.bind(this);
  }

  componentDidMount() {
    const { movePause } = this.state;
    this.interval = setInterval(this.intervalFunction, movePause);
    this.loadGame();
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentGame } = this.state;
    if (prevState.currentGame !== currentGame) {
      this.loadGame();
    }
  }

  pause = () => {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      paused: true,
    });
  };

  startAgain = () => {
    const { movePause } = this.state;
    this.interval = setInterval(this.intervalFunction, movePause);
    this.setState({
      paused: false,
    });
  };

  restartInterval = (movePause) => {
    clearInterval(this.interval);
    this.interval = setInterval(this.intervalFunction, movePause);
  };

  changeInterval = (delta) => {
    const { movePause } = this.state;
    const interval = movePause + delta;
    this.restartInterval(interval);
    this.setState({
      movePause: interval,
    });
  };

  slowly = () => {
    this.changeInterval(100);
  };

  quickly = () => {
    const { movePause } = this.state;
    if (movePause > 100) {
      this.changeInterval(-100);
    }
  };

  loadGame = () => {
    const { currentGame } = this.state;
    const pgn = mygames[currentGame];
    this.game.clear();
    this.game.load_pgn(pgn);
    const moves = this.game.history();
    const headers = this.game.header();
    const start = headers.FEN;
    this.game.clear();
    // eslint-disable-next-line no-unneeded-ternary
    this.game.load(start ? start : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');
    this.gameMoves = moves.map((v) => {
      this.game.move(v);
      return this.game.fen();
    });
    this.setState({
      headers,
    });
  };

  loadNextGame = () => {
    const { currentGame } = this.state;
    this.setState({
      currentMove: 0,
      position: 'start',
      currentGame: currentGame + 1,
    });
  };

  intervalFunction() {
    const {
      currentMove,
    } = this.state;
    if (currentMove < this.gameMoves.length) {
      // console.log(currentMove, this.gameMoves[currentMove]);
      this.setState({
        currentMove: currentMove + 1,
        position: this.gameMoves[currentMove],
      });
    } else {
      this.loadNextGame();
    }
  }

  render() {
    let resultClass;
    const {
      position,
      headers,
      paused,
      movePause,
    } = this.state;
    const board = (
      <Chessboard
        width={window.innerHeight - 20}
        position={position}
        transitionDuration={100}
        boardStyle={{
          margin: '5px auto',
        }}
      />
    );
    switch (headers.Result) {
      case '0-1':
        resultClass = 'black-border';
        break;
      case '1-0':
        resultClass = 'green-border';
        break;
      case '1/2-1/2':
        resultClass = 'yellow-border';
        break;
      default:
        resultClass = 'no-border';
    }

    return (
      <div className="App">
        <div className="leftBoard">
          <div className="legend">
          LEGEND:
            <hr />
            <span className="color-identy black-border">&nbsp;</span>
            <span className="description">Black Wins</span>
            <hr />
            <span className="color-identy green-border">&nbsp;</span>
            <span className="description">White Wins</span>
            <hr />
            <span className="color-identy yellow-border">&nbsp;</span>
            <span className="description">Draw</span>
          </div>
          <div className="controls">
            <button type="button" className="pauseButton" onClick={() => (paused ? this.startAgain() : this.pause())}>{paused ? 'Go' : 'Pause'}</button>
            <div className="buttonGroup">
              <button type="button" className="slowlyButton" onClick={this.slowly}>Slowly</button>
              <button type="button" className="quicklyButton" onClick={this.quickly} disabled={movePause <= 100}>Quickly</button>
            </div>
            <div className="currentSpeed">
Pause between moves
              <br />
              {(movePause / 1000).toFixed(1)}
              {' '}
sec.
            </div>
          </div>
        </div>
        <div className={`centerBoard ${resultClass}`}>
          {board}
        </div>
        <div className="rightBoard">
        PLAYERS:
          <hr />
          <span className="color-identy black-border">&nbsp;</span>
          <span className="description">{headers.Black}</span>
          <br />
          <span className="description">
            ELO:
            {headers.BlackElo ? headers.BlackElo : ' - '}
          </span>
          <hr />
          <span className="color-identy white-border">&nbsp;</span>
          <span className="description">{headers.White}</span>
          <br />
          <span className="description">
            ELO:
            {headers.BlackElo ? headers.WhiteElo : ' - '}
          </span>
          <hr />
          <span className="description">{headers.Date}</span>
          <br />
          <span className="description">
            {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
            {headers.Site} / {' '} {headers.Event} / Round: {headers.Round}
          </span>

        </div>
      </div>
    );
  }
}

export default hot(module)(App);
