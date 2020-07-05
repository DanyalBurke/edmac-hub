import * as React from 'react';
import {Jumbotron, Table} from "react-bootstrap";
import 'whatwg-fetch';
import * as moment from "moment-timezone";

class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.eventsStore = props.eventsStore;

        this.state = {
            items: null,
        };
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.eventsStore.getEvents().then((json) => {
            if(json) {
                console.log("Items: " + JSON.stringify(json));
                this.setState({items: json});
            }
        })
    }

    render() {
        if (this.state.items === null) {
            return ( <span></span> )
        }
        else if (this.state.items.length === 0) {
            return ( <span></span> )
        } else {
            let sortedItems = this.state.items;
            sortedItems.sort((a, b) => moment(a.eventDate, 'DD/MM/YYYY').valueOf() - moment(b.eventDate, 'DD/MM/YYYY').valueOf());
            let content = this.state.items.sort().map(item=> (

                <li key={item.name}>
                    {this.formatEventDate(item.eventDate)}: {item.name} - <strong>{item.detail}</strong>
                </li>
            ))
            return ( <Jumbotron><strong>Upcoming events:</strong> {content} </Jumbotron> );
        }


    }

    formatEventDate(eventDate) {
        return moment(eventDate, 'DD/MM/YYYY').format('ddd Do')
    }
}

export default EventsList;