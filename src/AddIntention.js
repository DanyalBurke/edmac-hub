import * as React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'whatwg-fetch';
import * as moment from "moment";

class AddIntention extends React.Component {

    constructor(props) {
        super(props);

        this.intentionsStore = props.intentionsStore;

        this.state = {
            visit_time: 12
        };
    }

    render() {
        return (
        <span>

            <p>Give an indication of when you intend to go to Epsom Downs today:</p>
            <form onSubmit={this.addIntention.bind(this)}>
                <FormGroup controlId="time">
                    <ControlLabel>I intend to go to Epsom Downs at:</ControlLabel>
                    <div className="input-group">
                        <FormControl
                            autoFocus="true"
                            componentClass="select" placeholder="12PM"
                            value={this.state.visit_time}
                            onChange={this.visitTimeChanged.bind(this)}
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
        </span>
        );
    }

    visitTimeChanged(event) {
        this.setState({ visit_time: parseInt(event.target.value, 10)});
    }


    addIntention(event) {
        event.preventDefault();
        this.intentionsStore.addIntention(this.props.name, this.state.visit_time);
    }
}

export default AddIntention;