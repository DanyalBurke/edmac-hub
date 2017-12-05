import * as React from 'react';
import {Table} from "react-bootstrap";
import 'whatwg-fetch';
import * as moment from "moment-timezone";

class Intentions extends React.Component {
    constructor(props) {
        super(props);

        this.intentionsStore = props.intentionsStore;
        this.messagesStore = props.messagesStore;

        this.state = {
            items: null,
            messages: null
        };
    }

    componentDidMount() {
        this.load();
        this.intentionsStore.subscribe(() => this.load());
        this.loadMessage();
        this.messagesStore.subscribe(() => this.loadMessage());
    }

    load() {
        this.intentionsStore.getIntentions().then((json) => {
            console.log("Items: " + JSON.stringify(json));
            this.setState({items: json})
        })
    }

    loadMessage() {
        this.messagesStore.getMessages().then((json) => {
            this.setState({messages: json });
        });
    }

    formatVisitTime(time) {
        return moment(time, 'HH:mm').format("h:mm A");
    }

    render() {
        var messageMap = (this.state.messages || []).reduce(function(map, json) {
            map[json.name] = json.message;
            return map;
        }, {});

        let tableContent = null
        if (this.state.items === null) {
           tableContent = null;
        }
        else if (this.state.items.length === 0) {
            tableContent = ( <tr key="noitems"><td colSpan="3" className="tableMessage"> Be the first to go to the downs </td></tr> )
        } else {
            let sortedItems = this.state.items;
            sortedItems.sort((a, b) => moment(a.visitTime, 'HH:mm').valueOf() - moment(b.visitTime).valueOf());
            tableContent = this.state.items.sort().map(item=> (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{this.formatVisitTime(item.visitTime)}</td>
                    <td>{messageMap[item.name]}</td>
                </tr>
            ))
        }

        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                    <th>Message</th>
                </tr>
                </thead>
                <tbody>

                {tableContent}

                </tbody>
            </Table>
        );
    }
}

export default Intentions;