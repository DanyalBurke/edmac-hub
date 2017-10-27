import * as React from 'react';
import './App.css';
import Login from './Login.js';
import IntentionsStore from "./IntentionsStore";
import MainApp from "./MainApp";
import {PageHeader} from "react-bootstrap";

class App extends React.Component {
    intentionsStore = new IntentionsStore();

    constructor(props) {
        super(props)
        this.state = {
            name: ""
        }
    }

    isLoggedIn() {
        return this.state.name.length > 0;
    }

    render() {
        let title = null, body = null;
        if (this.isLoggedIn()) {
            body = (
                <MainApp name={this.state.name} intentionsStore={this.intentionsStore} />
            );

        } else {
            body = (
                <span>
                    <div className="App-header">
                        <img src="logo.png" alt="logo" />
                    </div>
                    <div className="container App-header">
                        <h2>Welcome to EDMAC Hub!</h2>
                    </div>

                    <Login refs="login" onLogin={this.onLogin.bind(this)}/>
                </span>
            );
        }

        return body;
    }

  onLogin(name) {
      this.setState({name: name});
  }
}

export default App;
