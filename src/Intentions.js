import * as React from 'react';
import {Button, Table} from "react-bootstrap";
import 'whatwg-fetch';
import * as moment from "moment-timezone";

class Intentions extends React.Component {
    constructor(props) {
        super(props);

        this.intentionsStore = props.intentionsStore;

        this.state = {
            items: null
        };
    }

    componentDidMount() {
        this.load();
        this.subscription = this.load.bind(this);
        this.intentionsStore.subscribe(this.subscription);
    }

    componentWillUnmount() {
        this.intentionsStore.unsubscribe(this.subscription)
    }

    load() {
        this.intentionsStore.getIntentions().then((json) => {
            if(json) {
                console.log("Items: " + JSON.stringify(json));
                this.setState({items: json});
            }
        })
    }

    formatVisitTime(time) {
        return moment(time, 'HH:mm').format("h:mm A");
    }

    formatParking(time, parkingSpace) {
        let parkingTimeLimit = moment(time, 'HH:mm').add(2, 'hours').format("h:mm A")
        if(parkingSpace) {
            return "✓ (Until " + parkingTimeLimit + ")";
        }
        else {
            return "";
        }
    }

    formatDay(date) {
        let formatted =  moment(date, "YYYY-MM-DD").format("dddd Do MMMM")
        if(date === moment().format("YYYY-MM-DD")) {
            return "Today - " + formatted;
        }
        else if (date === moment().add(1 , 'day').format("YYYY-MM-DD")) {
            return "Tomorrow - " + formatted;
        }
        else {
            return formatted;
        }
    }

    visitDays() {
        // Unique set of days
        return this.state.items === null ? [] :
            this.state.items.map(item => item.visitDate).filter((value, index, self) => self.indexOf(value) === index).sort()
    }

    render() {
        let tableContent = null
        if (this.state.items === null) {
            tableContent = ( <tr key="noitems"><td colSpan="4" className="tableMessage"> ... Loading ... </td></tr> )
        }
        else if (this.state.items.length === 0) {
            tableContent = ( <tr key="noitems"><td colSpan="4" className="tableMessage"> Be the first to go to the downs </td></tr> )
        } else {
            tableContent = this.visitDays().map(day => (
                <React.Fragment key={day}>
                    <tr key={day} style={{"backgroundColor": "#96bfff"}}>
                        <td colSpan="4" style={{"fontSize": "10pt"}}>
                            <strong>{this.formatDay(day)}</strong>
                        </td>
                    </tr>
                    {
                        this.renderItems(this.state.items.filter(item => item.visitDate === day))
                    }
                </React.Fragment>
            ))
        }

        return (
            <Table striped bordered hover>
                <thead style={{"fontWeight": "bolder", "backgroundColor": "#BBB", color: "#333", "fontSize": "12pt"}}>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>EDMAC Parking</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>

                {tableContent}

                </tbody>
            </Table>
        );
    }

    renderItems(items) {
        return items
            .sort((a, b) => moment(a.visitTime, 'HH:mm').valueOf() - moment(b.visitTime, 'HH:mm').valueOf())
            .map(item=> (
            <tr key={item.name + item.visitDate}>
                <td>{item.name}</td>
                <td>{this.formatVisitTime(item.visitTime)}</td>
                <td>{this.formatParking(item.visitTime, item.parkingSpace)}</td>
                <td style={{width: '1%', "minWidth": "5em"}}>{item.name === this.props.name ? (
                    <Button bsStyle="primary" className="btn-sm" style={{padding: "2px 10px"}} onClick={this.cancel.bind(this, item)}>Cancel</Button>) : ""}</td>
            </tr>
        ))
    }

    cancel(item) {
        this.intentionsStore.removeIntention(item.name, item.visitDate);
    }
}

export default Intentions;