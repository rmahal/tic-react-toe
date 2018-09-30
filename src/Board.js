import React, { Component } from 'react';
import Square from './Square'
import './App.css';

class Board extends Component {

  constructor(){
    super()
    this.state = {
      player1: true,
      game: ['', '', '', '', '', '', '', '', ''],
      message: '',
      inPlay: true,
      restart: false,
      p1Score: 0,
      p2Score: 0,
    }
  }

  reportMark = (pos) => {
    if(!this.state.inPlay){
      return null;
    }
    let mark = this.state.player1 ? 'X' : 'O';
    console.log(`Player ${mark} at position ${pos}`)

    // set my mark in the game array
    if(this.state.game[pos] === ''){
      let game = this.state.game
      game[pos] = mark
      this.setState({ game })
      this.checkWin(mark)
      this.flip()
    }

  }

  flip  = () => {
    let player1 = !this.state.player1
    this.setState({
      player1
    })

  }

  checkWin = (mark) => {
    let game = this.state.game 
    if(
      (game[0] === mark &&  game[3] === mark  &&  game[6] === mark) ||
      (game[1] === mark &&  game[4] === mark    &&  game[7] === mark) ||
      (game[2] === mark &&  game[5] === mark  &&  game[8] === mark) ||

      (game[0] === mark &&  game[1] === mark  &&  game[2] === mark) ||
      (game[3] === mark &&  game[4] === mark  &&  game[5] === mark) ||
      (game[6] === mark &&  game[7] === mark  &&  game[8] === mark) ||

      (game[0] === mark &&  game[4] === mark  &&  game[8] === mark) ||
      (game[2] === mark &&  game[4] === mark  &&  game[6] === mark)){

      let p1Score = this.state.p1Score
      let p2Score = this.state.p2Score

      if(mark === 'X'){
        p1Score += 1 
      }else{
        p2Score += 1
      }
      this.setState({
        message: `PLAYER ${(mark === 'X') ? 1: 2} WINS!!!! Congrats ${mark}!`, 
        p1Score: p1Score,
        p2Score: p2Score,
        inPlay: false, 
        restart: true,
      })
    }else{
      if((
        game[0] !== '' && game[1] !== '' &&  game[2] !== '' &&  game[3] !== ''  && game[4] !== '' &&  game[5] !== '' &&  game[6] !== '' &&  game[7] !== '' && game[8] !== '')){
          this.setState({
            message: `TIE!!!!`, 
            inPlay: false, 
            restart: true,
          })
          return null
        }
    }
  }


  reset = () => {
    this.setState({
      player1: true,
      game: ['', '', '', '', '', '', '', '', ''],
      message: '',
      inPlay: true,
      restart: false,
    })
  }





  render() {

    let squares = []

    for(let i = 0; i < 9; i++){
      squares.push( <Square 
                      key={i} 
                      pos={i} 
                      mark={this.state.game[i]}
                      reportMark={this.reportMark} // giving my function to Square
                      /> )
    }

    let buttonCondis = ''

    if(this.state.restart === true){
      buttonCondis = <button onClick={this.reset}>Play Again?</button>
    }

    return (
      <div>
        <div className="centerContent">
        <h1>React-Tac-Toe</h1>
        <h3>{this.state.message}</h3>
        {buttonCondis}
        <h4>Turn: {this.state.player1 ? 'Player 1' : 'Player 2' }</h4>
        <h4>Score</h4>
        <h5>Player One: {this.state.p1Score} &mdash; Player Two: {this.state.p2Score}</h5>
        <div className="board">
          {squares}
        </div>
        </div>
      </div>
    );
  }
}

export default Board;
