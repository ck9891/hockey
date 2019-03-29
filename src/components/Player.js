import React, { Component } from 'react'

class Player extends Component {
  render() {
    return (
      <div className="player-card">
        <div className="player-header">
          <h2>{this.props.playerName}</h2>
        </div>
        <div className="player-info">
          <p>{this.props.playerInfo}</p>
        </div>
      </div>
    )
  }
}

export default Player;
