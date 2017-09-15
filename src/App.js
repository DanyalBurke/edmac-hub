import * as React from 'react';
import './App.css';
import Runway from './Runway';
import Login from './Login.js';
import AddIntention from "./AddIntention";
import Intentions from "./Intentions";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="logo.png" alt="logo" />
          <h2>{this.state.name.length > 0 ? this.state.name + ", " : ""} Welcome to EDMAC Hub</h2>
        </div>
          {this.state.name.length == 0
              ?
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <Runway />
                        </div>
                        <div className="col-md-1"> </div>
                        <div className="col-md-6">
                                <Login refs="login" onLogin={this.onLogin.bind(this)}/>
                        </div>
                        <div className="col-md-1"> </div>

                    </div>
                </div>
              :
                <div className="container">
                    <AddIntention />
                    <Intentions />
                </div>
          }
      </div>
    );
  }

  onLogin(name) {
      this.setState({name: name});
  }
}

export default App;
