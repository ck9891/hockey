import React, { Component } from 'react';
import Player from './components/Player';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teamID: 5,
      teamName: '',
      rosterName: [],
      isLoaded: false,
      nhlTeams: '',
    }
  }

  handleSelectChange = (event) => {
    console.log('changed!');
    return this.setState({
      teamID: event.target.value
    })
  }

  teamFetch = () => {
    // variable to fetch the basic team info
    const teamData = fetch('https://statsapi.web.nhl.com/api/v1/teams/' + this.state.teamID, {
      method: 'GET'
    })

    // variable to fetch the basic player info on the team
    const playerData = fetch('https://statsapi.web.nhl.com/api/v1/teams/' + this.state.teamID + '/roster', {
      method: 'GET'
    })
    const nhlTeams = fetch('https://statsapi.web.nhl.com/api/v1/teams/', {
      method: 'GET',
    })
    Promise.all([teamData, playerData, nhlTeams])
      .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
      .then(([json1, json2, json3]) => {
        this.setState({
          isLoaded: true,
          teamName: json1,
          rosterName: json2,
          nhlTeams: json3,
        })

      })
      .catch(e => {
        console.log(e)
      })
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.teamID === nextState.teamID) {
      return true
    }
  }
  componentDidUpdate() {
    // // variable to fetch the basic team info
      this.teamFetch();
    }
  componentDidMount() {

    this.teamFetch();

  }


  render() {
    let { isLoaded, rosterName, teamName, nhlTeams } = this.state;
    var playerID = [];

    if (!isLoaded) {
      return (
        <h1>loading...</h1>
      )
    } else {
      return (
        <div>
          <div>
            <select onChange={this.handleSelectChange}>
              {
                nhlTeams.teams.map(
                  (x, index) => {
                    let team = x.name;
                    let id = index + 1;
                    return <option value={id}>{team}</option>
                  }
                )
              }
            </select>

          </div>
          <h1>{teamName.teams[0].name} Roster</h1>
          {rosterName.roster.map(function (x, index) {
            playerID.push(rosterName.roster[index].person.id)
            return (
              <Player playerName={rosterName.roster[index].person.fullName} playerInfo={rosterName.roster[index].jerseyNumber} />

              // <div key={index}>
              //   <h3 className="playerCard" key={index}>{rosterName.roster[index].person.fullName} #{rosterName.roster[index].jerseyNumber}</h3>
              //   <p>{playerID[index]}</p>

              // </div>
            )
          })}
        </div>
      );
    }
  }
}

export default App;
