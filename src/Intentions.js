import * as React from 'react';
import {Table} from "react-bootstrap";
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
        this.intentionsStore.subscribe(() => this.load());
    }

    load() {
        this.intentionsStore.getIntentions().then((json) => {
            console.log("Items: " + JSON.stringify(json));
            this.setState({items: json})
        })
    }

    formatVisitTime(time) {
        return moment(time, 'HH:mm').format("h:mm A");
    }

    render() {

        let tableContent = null
        if (this.state.items === null) {
           tableContent = null;
        }
        else if (this.state.items.length === 0) {
            tableContent = ( <tr key="noitems"><td colSpan="2" className="tableMessage"> Be the first to go to the downs </td></tr> )
        } else {
            let sortedItems = this.state.items;
            sortedItems.sort((a, b) => a.visitTime - b.visitTime);
            tableContent = this.state.items.sort().map(item=> (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>Going at {this.formatVisitTime(item.visitTime)}</td>
                </tr>
            ))
        }

        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
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