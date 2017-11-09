import * as React from 'react';
import { Jumbotron, Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'whatwg-fetch';
import * as moment from "moment";

class AddIntention extends React.Component {

    constructor(props) {
        super(props);

        this.intentionsStore = props.intentionsStore;

        this.state = {
            visitTime: 12,
            currentIntention: null
        };
    }

    componentDidMount() {
        this.load();
        this.intentionsStore.subscribe(() => this.load());
    }

    load() {
        this.intentionsStore.getIntentions().then((json) => {
            let currentIntention = json.find((row) => row.name === this.props.name) || null;
            this.setState({
                currentIntention: currentIntention
            });
        })
    }

    render() {
        if(this.state.currentIntention !== null) {
            return (
                <span>
                    <p><strong>You are going today at {this.formatVisitTime(this.state.currentIntention.time)}</strong></p>
                    <Button bsStyle="primary" onClick={this.removeIntention.bind(this)}>I'm not going anymore!</Button>
                </span>
            )
        }
        else {
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
                                    value={this.state.visitTime}
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
    }

    visitTimeChanged(event) {
        this.setState({ visitTime: parseInt(event.target.value, 10)});
    }


    addIntention(event) {
        event.preventDefault();
        this.intentionsStore.addIntention(this.props.name, this.state.visitTime);
    }

    removeIntention(event) {
        event.preventDefault();
        this.intentionsStore.removeIntention(this.props.name);
    }

    formatVisitTime(time) {
        if(time < 12) {
            return time + " AM";
        }
        else if (time === 12) {
            return "12 PM";
        }
        else {
            return time - 12 + " PM";
        }
    }
}

export default AddIntention;