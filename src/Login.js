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
        <Jumbotron>
            <form onSubmit={this.login.bind(this)}>
                <FormGroup controlId="name">
                    <ControlLabel>Name</ControlLabel>
                    <div className="input-group">
                        <FormControl
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
        </Jumbotron>
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
        this.setState({name: event.target.value});
    }
}

export default Login;