import * as React from 'react';
import {Table} from "react-bootstrap";
import 'whatwg-fetch';

class Intentions extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [ ]
        };
        fetch('/api/intentions.php5', {
            method: 'get'
        }).then((response) =>
            console.log(response.text())
        ).catch((err) => console.log(err))
    }

    componentDidMount() {
        fetch('/api/intentions.php5', {
            method: 'get'
        }).then((response) =>
            response.json()
        ).then((json) =>
            this.setState({ items: json })
        ).catch((err) =>
            console.log(err)
        );
    }

    render() {
        return (

            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name { this.state.items.length } </th>
                    <th>Status { JSON.stringify(this.state.items.map) } </th>
                </tr>
                </thead>
                <tbody>

                { this.state.items.map(item=> (
                    <tr>
                        <td> {item.name} </td>
                        <td> Going at {item.visit_time}:00</td>
                    </tr>
                    )) }

                </tbody>
            </Table>
        );
    }
}

export default Intentions;