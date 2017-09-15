import * as React from 'react';
import {Table} from "react-bootstrap";

class Intentions extends React.Component {
    render() {
        return (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Danyal</td>
                    <td>Looking since 7 AM</td>
                </tr>
                <tr>
                    <td>Brian</td>
                    <td>Going at 12 PM</td>
                </tr>
                <tr>
                    <td>Rob</td>
                    <td>Going at 12 PM</td>
                </tr>
                </tbody>
            </Table>
        );
    }
}

export default Intentions;