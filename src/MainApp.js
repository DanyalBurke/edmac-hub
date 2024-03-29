import * as React from 'react';
import Runway from "./Runway";
import {Button, Jumbotron, Nav, Navbar, NavItem} from "react-bootstrap";
import AddIntention from "./AddIntention";
import Intentions from "./Intentions";
import * as moment from "moment-timezone";
import Visitors from "./Visitors";
import EventsList from "./EventsList";

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.visitorsStore = this.props.visitorsStore;

        this.state = {
            'selected': 'intentions'
        }
    }

    handleSelect(selectedKey) {
        this.setState({
            'selected': selectedKey
        });
    }

    componentDidMount() {
        this.visitorsStore.addVisitor(this.props.name);
    }



    render() {

        let top = (
            <span>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Button bsStyle="link" onClick={this.props.onLogout}>EDMAC Hub</Button>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.selected} onSelect={this.handleSelect.bind(this)}>
                            <NavItem eventKey={'intentions'}> Who's going? </NavItem>
                            <NavItem eventKey={'weather'}> Weather </NavItem>
                            <NavItem eventKey={'visitors'}> Visitors </NavItem>
                            <NavItem onClick={this.props.onLogout}>Logout</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

            </span>

        );

        switch (this.state.selected) {
            case 'intentions':
                return (
                    <span>
                        {top}
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8">
                                    <EventsList eventsStore={this.props.eventsStore} />
                                    <Jumbotron>
                                        <AddIntention name={this.props.name} intentionsStore={this.props.intentionsStore} messagesStore={this.props.messagesStore} />
                                    </Jumbotron>
                                    <Jumbotron>
                                        <p>Going in the next 7 days</p>
                                        <Intentions name={this.props.name} intentionsStore={this.props.intentionsStore} messagesStore={this.props.messagesStore} />
                                    </Jumbotron>
                                </div>
                            </div>
                        </div>
                    </span>
                    );
            case 'weather':
                return (
                    <span>
                        {top}
                        <div className="container">
                            <Runway />
                        </div>
                    </span>);
            case 'visitors':
                return (
                    <span>
                        {top}
                        <div className="container">
                            <Jumbotron>
                            <Visitors visitorsStore={this.props.visitorsStore} />
                            </Jumbotron>
                        </div>
                    </span>
                )
            default:
                return (
                    <span>
                        {top}
                        <div className="container"> ERROR </div>
                    </span> );
        }
    }
}

export default AppMenu;