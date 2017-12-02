import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'whatwg-fetch';
import * as moment from "moment";

class AddIntention extends React.Component {

    constructor(props) {
        super(props);

        this.intentionsStore = props.intentionsStore;

        this.state = {
            visitTime: this.suggestedVisitTime(),
            currentIntention: null
        };
    }

    suggestedVisitTime() {
        let currentTime = moment().tz("Europe/London");
        currentTime.minutes(currentTime.minutes() - (currentTime.minutes() % 15))
        return (currentTime.hour() >= 12 && currentTime.hour() <= 20 ? currentTime.format("HH:mm") : "12:00");
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
                    <p><strong>You are going today at {this.formatVisitTime(this.state.currentIntention.visitTime)}</strong></p>
                    <Button bsStyle="primary" onClick={this.removeIntention.bind(this)}>I'm not going anymore!</Button>
                </span>
            )
        }
        else {

            let flyingTimes = [];
            for(let time = moment("12:00", "HH:mm"); time.isBefore(moment("20:00", "HH:mm")); time.add(15, 'minutes')) {
                flyingTimes.push(moment(time));
            }

            let options = flyingTimes.map(time => ( <option key={time.format("HH:mm")} value={time.format("HH:mm")}>{time.format("h:mm A")}</option> ));

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
                                    {options}
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
        this.setState({ visitTime: event.target.value });
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
        return moment(time, 'HH:mm').format("h:mm A");
    }
}

export default AddIntention;