import 'babel-polyfill'
import * as React from 'react';
import './App.css';
import Login from './Login.js';
import IntentionsStore from "./IntentionsStore";
import MainApp from "./MainApp";
import Cookie from 'js-cookie'
import MessagesStore from "./MessagesStore";
import VisitorsStore from "./VisitorsStore";

class App extends React.Component {
    intentionsStore = new IntentionsStore();
    messagesStore = new MessagesStore();
    visitorsStore = new VisitorsStore();

    constructor(props) {
        super(props)

        this.state = {
            name: Cookie.get('name') ? Cookie.get('name') : ""
        }
    }

    isLoggedIn() {
        return this.state.name.length > 0;
    }

    render() {
        let body = null;
        if (this.isLoggedIn()) {
            body = (
                <MainApp name={this.state.name} onLogout={this.onLogout.bind(this)} intentionsStore={this.intentionsStore} messagesStore={this.messagesStore} visitorsStore={this.visitorsStore} />
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
      Cookie.set('name', name, { expires: 365 });
      this.setState({name: name});
  }

  onLogout() {
      Cookie.remove('name');
      this.setState({name: ""});
  }
}

export default App;
