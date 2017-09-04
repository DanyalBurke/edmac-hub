import * as React from 'react';
import './App.css';
import Runway from './Runway';
import Login from './Login.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src="logo.png" alt="logo" />
          <h2>Welcome to EDMAC Hub</h2>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-8">
                    <Login />
                </div>
                <div className="col-md-4">
                    <Runway />
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
