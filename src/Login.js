import * as React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <Jumbotron>
                            <form onSubmit={this.login.bind(this)}>
                                <FormGroup controlId="name">
                                    <ControlLabel>Name</ControlLabel>
                                    <div className="input-group">
                                        <FormControl
                                            placeholder="eg. John Smith"
                                            autoFocus="true"
                                            type="text"
                                            defaultValue=""
                                            onChange={this.handleChange.bind(this)}
                                        />
                                        <span className="input-group-btn">
                                            <Button bsStyle="primary" disabled={!this.validateForm()} onClick={this.login.bind(this)}>Login</Button>
                                        </span>
                                    </div>
                                </FormGroup>

                            </form>
                            <span className="version">v2.0</span>
                        </Jumbotron>
                    </div>
                </div>

            </div>

        );
    }

    login(event) {
        event.preventDefault();
        this.props.onLogin(this.state.name);
    }

    validateForm() {
        return this.state.name.length > 0;
    }

    handleChange(event) {
        this.setState({name: this.namealize(event.target.value.trim())});
    }

    namealize(name) {
        return name.replace(/[^A-Za-z ]+/g, '')
                   .split(/\s+/)
                   .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
                   .join(" ");
    }
}

export default Login;