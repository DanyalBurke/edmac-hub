import * as React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

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
                            <option value="12pm">12 PM</option>
                            <option value="1pm">1 PM</option>
                            <option value="2pm">2 PM</option>
                            <option value="3pm">3 PM</option>
                            <option value="4pm">4 PM</option>
                            <option value="5pm">5 PM</option>
                            <option value="6pm">6 PM</option>
                            <option value="7pm">7 PM</option>

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

    }
}

export default AddIntention;