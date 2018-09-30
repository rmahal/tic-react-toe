import React, { Component } from 'react';
import './App.css';

class Square extends Component {
  
  handleClick = () => {
    // call a function from Board.js to update the game array with the mark.
    this.props.reportMark(this.props.pos)
  }

  render() {
    return (
      <div className="square" onClick={ this.handleClick }>
        <h1>{this.props.mark}</h1>
      </div>
    );
  }
}

export default Square;