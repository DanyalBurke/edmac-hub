import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'fetch-retry';
import * as moment from "moment";

class AddIntention extends React.Component {

    constructor(props) {
        super(props);

        this.intentionsStore = props.intentionsStore;
        this.messagesStore = props.messagesStore;

        this.state = {
            visitTime: this.suggestedVisitTime(),
            message: "",
            currentIntention: null
        };
    }

    suggestedVisitTime() {
        let currentTime = moment().tz("Europe/London");
        currentTime.minutes(currentTime.minutes() - (currentTime.minutes() % 15));
        return (currentTime.hour() >= 12 && currentTime.hour() <= 20 ? currentTime.format("HH:mm") : "12:00");
    }

    componentDidMount() {
        this.load();
        this.intentionsStore.subscribe(() => this.load());
        this.loadMessage();
        this.messagesStore.subscribe(() => this.loadMessage());
    }

    load() {
        this.intentionsStore.getIntentions(this.props.name).then((json) => {
            if(json) {
                let currentIntention = json.find((row) => row.name === this.props.name) || null;
                this.setState({
                    currentIntention: currentIntention
                });
            }
        });
    }

    loadMessage() {
        this.messagesStore.getMessages().then((json) => {
            if(json) {
                let currentMessage = json.find((row) => row.name === this.props.name) || null;
                this.setState({
                    message: currentMessage == null ? "" : currentMessage.message
                });
            }
        });
    }

    render() {

        if(this.state.currentIntention !== null) {
            return (
                <span>
                    <div className="row" style={{'marginBottom': '2em'}}>
                        <p className="text-center"><strong>You are going today at {this.formatVisitTime(this.state.currentIntention.visitTime)}</strong></p>
                        <Button className="center-block" bsStyle="primary" onClick={this.removeIntention.bind(this)}>I'm not going anymore!</Button>
                    </div>

                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Leave a short message for others to see</ControlLabel>
                        <div className="input-group">
                            <FormControl
                                autoFocus="true"
                                componentClass="input"
                                placeholder="... Gone home now! ..."
                                onChange={this.messageChanged.bind(this)}
                                value={this.state.message}
                                maxLength="100"
                            />
                            <span className="input-group-btn">
                                <Button bsStyle="primary" onClick={this.addMessage.bind(this)}>Update message</Button>
                            </span>
                        </div>
                    </FormGroup>

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
                    <p>Welcome, there is no flying currently.</p>
                    <hr>
                    <p>Due to Covid-19, the government restrictions on our movements now make it impossible to fly safely and responsibly on the Downs.</p>
                    <p>Consequently, the Committee declare that all flying is suspended with immediate effect until further notice.</p>
                    <p>As government restrictions are lifted in the future, the suspension will be reviewed and lifted in due course.</p>
                    <!--<p>Welcome, {this.props.name}: Give an indication of when you intend to go to Epsom Downs today:</p>-->
                    <form hidden onSubmit={this.addIntention.bind(this)}>
                        <FormGroup controlId="time">
                            <ControlLabel>I intend to go to Epsom Downs at:</ControlLabel>
                            <div className="input-group">
                                <FormControl
                                    autoFocus="true"
                                    componentClass="select"
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

    messageChanged(event) {
        this.setState({ message: event.target.value });
    }

    visitTimeChanged(event) {
        this.setState({ visitTime: event.target.value });
    }


    addMessage(event) {
        event.preventDefault();
        this.messagesStore.addMessage(this.props.name, this.state.message);
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