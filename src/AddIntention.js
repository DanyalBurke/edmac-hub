import * as React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import 'fetch-retry';
import * as moment from "moment";

class AddIntention extends React.Component {

    constructor(props) {
        super(props);

        let now = moment().tz("Europe/London")
        this.now = function() { return moment(now); }

        this.intentionsStore = props.intentionsStore;

        this.state = {
            visitTime: this.suggestedVisitTime(),
            visitDate: this.suggestedVisitDate(),
            parkingSpace: false,
            intentions: null,
            addIntentionError: null
        };
    }

    suggestedVisitTime() {
        let currentTime = this.now();
        currentTime.minutes(currentTime.minutes() - (currentTime.minutes() % 15));
        return (currentTime.hour() >= 12 && currentTime.hour() < 20 ? currentTime.format("HH:mm") : "12:00");
    }

    suggestedVisitDate() {
        return this.now().format("YYYY-MM-DD")
    }

    componentDidMount() {
        this.load();
        this.subscription = this.load.bind(this)
        this.intentionsStore.subscribe(this.subscription);
    }

    componentWillUnmount() {
        this.intentionsStore.unsubscribe(this.subscription)
    }

    load() {
        this.intentionsStore.getIntentions().then((json) => {
            if(json) {
                let intentions = json.filter((row) => row.name === this.props.name);
                this.setState({
                    intentions: intentions
                });
            }
        });
    }

    renderDate(date, short) {
        let formatted = date.format("dddd Do MMMM")
        if(date.format("YYYY-MM-DD") === this.now().format("YYYY-MM-DD")) {
            if (short) {
                return "Today"
            } else {
                return "Today - " + formatted;
            }
        }
        else if (date.format("YYYY-MM-DD") === this.now().add(1 , 'day').format("YYYY-MM-DD")) {
            if (short) {
                return "Tomorrow"
            } else {
                return "Tomorrow - " + formatted;
            }
        }
        else {
            if (short) {
                return date.format("dddd")
            } else {
                return formatted;
            }
        }
    }

    flyingDates() {
        let flyingDates = []
        let date = this.now()
        for (let i = 0 ; i < 7 ; i++) {
            flyingDates.push(moment(date));
            date.add(1, 'day')
        }
        return flyingDates
    }

    flyingTimes() {
        let flyingTimes = [];
        for (let time = moment("12:00", "HH:mm"); time.isBefore(moment("20:00", "HH:mm")); time.add(15, 'minutes')) {
            flyingTimes.push(moment(time));
        }
        return flyingTimes
    }

    intentionForSelectedDate() {
        return this.state.intentions?.find(intention => intention.visitDate === this.state.visitDate)
    }

    render() {
        let dateOptions = this.flyingDates().map(date => (<option key={date.format("YYYY-MM-DD")}
                                                           value={date.format("YYYY-MM-DD")}>{this.renderDate(date)}</option>));

        return (
            <span>
                <p>Welcome, {this.props.name}: Choose a time to go to Epsom Downs</p>

                <FormGroup controlId="date">
                    <ControlLabel>Day:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.visitDate}
                        onChange={this.visitDateChanged.bind(this)}
                    >
                        {dateOptions}
                    </FormControl>
                </FormGroup>

                {
                    this.intentionForSelectedDate() == null ? this.renderChooseTimeForm() : this.renderIntentionForm()
                }
            </span>
        );
    }

    renderIntentionForm() {
        let intentionForSelectedDate = this.intentionForSelectedDate()
        return <div>
                <p className="text-center">
                    <strong>{this.renderDate(moment(intentionForSelectedDate.visitDate, "YYYY-MM-DD"), true)}: You are going at {this.formatVisitTime(intentionForSelectedDate.visitTime)}</strong>
                    {intentionForSelectedDate.parkingSpace === true ?
                        <strong><br />EDMAC Parking space is reserved until {this.formatVisitTime(moment(intentionForSelectedDate.visitTime, "HH:mm").add(2, 'hours'))}!</strong> : ""}
                </p>
                <div className="text-center">
                    <span className="input-group-btn">
                        <Button bsStyle="primary" onClick={this.cancel.bind(this)}>Cancel</Button>
                    </span>
                </div>
        </div>
    }

    renderChooseTimeForm() {
        let timeOptions = this.flyingTimes().map(time => (
            <option key={time.format("HH:mm")} value={time.format("HH:mm")}>{time.format("h:mm A")}</option>));

        return (
            <span>
                <FormGroup controlId="date">
                    <ControlLabel>Parking:</ControlLabel>
                    <FormControl
                        componentClass="select"
                        value={this.state.parkingSpace}
                        onChange={this.edmacParkingSpaceChanged.bind(this)}
                    >
                        <option key="false" value="false">I'll use the Public Car Park</option>
                        <option key="true" value="true">Book EDMAC Parking Space</option>
                    </FormControl>
                </FormGroup>
                <FormGroup controlId="time">
                    <ControlLabel>I intend to go to Epsom Downs at:</ControlLabel>
                    <div className="input-group">
                        <FormControl
                            componentClass="select"
                            value={this.state.visitTime}
                            onChange={this.visitTimeChanged.bind(this)}
                        >
                            {timeOptions}
                        </FormControl>

                        <span className="input-group-btn">
                            <Button bsStyle="primary" onClick={this.addIntention.bind(this)}>I'm going!</Button>
                        </span>
                    </div>
                </FormGroup>
                <p>
                    { this.state.addIntentionError ? <strong style={{color: '#400'}}>{this.state.addIntentionError}</strong> : "" }
                </p>
            </span>
        )
    }

    visitTimeChanged(event) {
        this.setState({ visitTime: event.target.value, addIntentionError: null })
    }

    visitDateChanged(event) {
        this.setState({ visitDate: event.target.value, addIntentionError: null })
    }

    edmacParkingSpaceChanged(event) {
        this.setState( { parkingSpace: event.target.value === "true", addIntentionError: null })
    }

    addIntention(event) {
        event.preventDefault();
        this.intentionsStore.addIntention(this.props.name, this.state.visitTime, this.state.visitDate, this.state.parkingSpace).then((response) => {
            this.setState({
                addIntentionError: null
            });
        }).catch((err) => {
            if(err.status === 409) {
                this.setState({
                    addIntentionError: 'Maximum 4 parking slots have already been booked. Please try another time!'
                });
            }
        })
    }

    cancel(event) {
        event.preventDefault();
        this.intentionsStore.removeIntention(this.props.name, this.state.visitDate)
    }

    formatVisitTime(time) {
        return moment(time, 'HH:mm').format("h:mm A");
    }
}

export default AddIntention;