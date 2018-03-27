import * as React from 'react';
import {Table} from "react-bootstrap";
import 'whatwg-fetch';
import * as moment from "moment-timezone";

class Visitors extends React.Component {
    constructor(props) {
        super(props);

        this.visitorsStore = props.visitorsStore;

        this.state = {
            items: null,
        };
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.visitorsStore.getVisitors().then((json) => {
            if(json) {
                console.log("Items: " + JSON.stringify(json));
                this.setState({items: json});
            }
        })
    }

    formatVisitTime(time) {
        return moment(time, 'HH:mm').format("h:mm A");
    }

    render() {
        let tableContent = null
        if (this.state.items === null) {
            tableContent = ( <tr key="noitems"><td colSpan="2" className="tableMessage"> ... Loading ... </td></tr> )
        }
        else if (this.state.items.length === 0) {
            tableContent = ( <tr key="noitems"><td colSpan="2" className="tableMessage"> No visitors except yourself yet! </td></tr> )
        } else {
            let sortedItems = this.state.items;
            sortedItems.sort((a, b) => moment(a.visitTime, 'HH:mm').valueOf() - moment(b.visitTime, 'HH:mm').valueOf());
            tableContent = this.state.items.sort().map(item=> (
                <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>{this.formatVisitTime(item.visitTime)}</td>
                </tr>
            ))
        }

        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Time</th>
                </tr>
                </thead>
                <tbody>

                {tableContent}

                </tbody>
            </Table>
        );
    }
}

export default Visitors;