import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'test'
        };
    }

    render() {
        return (
            <form onSubmit={this.login}>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus="true"
                        value={this.state.name}
                    />
                </FormGroup>
                <Button bsSize="large" bsStyle="primary" disabled={!this.validateForm()}>Login</Button>
            </form>
        );
    }

    login() {

    }

    validateForm() {
        return this.state.name.length > 0;
    }

    handleChange(event: any) {
        this.setState({name: event.target.value});
    }
}

export default Login;