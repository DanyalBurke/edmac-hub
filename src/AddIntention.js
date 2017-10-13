import * as React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'whatwg-fetch';

class AddIntention extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: ''
        };
    }

    render() {
        return (
        <Jumbotron>
            <p>Please give an indication of when you intend to go to Epsom Downs today:</p>
            <form onSubmit={this.addIntention.bind(this)}>
                <FormGroup controlId="time">
                    <ControlLabel>I intend to go to Epsom Downs at:</ControlLabel>
                    <div className="input-group">
                        <FormControl
                            autoFocus="true"
                            componentClass="select" placeholder="12PM"
                            defaultValue="12 PM"
                        >
                            <option value="12">12 PM</option>
                            <option value="13">1 PM</option>
                            <option value="14">2 PM</option>
                            <option value="15">3 PM</option>
                            <option value="16">4 PM</option>
                            <option value="17">5 PM</option>
                            <option value="18">6 PM</option>
                            <option value="19">7 PM</option>

                        </FormControl>
                        <span className="input-group-btn">
                            <Button bsStyle="primary" onClick={this.addIntention.bind(this)}>I'm going!</Button>
                        </span>
                    </div>
                </FormGroup>

            </form>
        </Jumbotron>
        );
    }

    addIntention(event) {
        event.preventDefault();
        fetch('/api/intentions.php5', {
            method: 'post',
            body: JSON.stringify({name: 'Greg', time: parseInt(event.target.value)})
        }).catch((err) =>
            console.log(err)
        );
    }
}

export default AddIntention;