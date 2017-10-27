import * as React from 'react';
import Runway from "./Runway";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import AddIntention from "./AddIntention";
import Intentions from "./Intentions";

class AppMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            'selected': 'intentions'
        }
    }

    handleSelect(selectedKey) {
        this.setState({
            'selected': selectedKey
        });
    }

    render() {

        let top = (
            <span>
                <Navbar stacked>
                    <Navbar.Header>
                        <Navbar.Brand>
                            EDMAC Hub
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav activeKey={this.state.selected} onSelect={this.handleSelect.bind(this)}>
                            <NavItem eventKey={'intentions'}> Who's going? </NavItem>
                            <NavItem eventKey={'weather'}> Weather </NavItem>
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
                            <h2>Welcome {this.props.name}</h2>
                            <AddIntention name={this.props.name} intentionsStore={this.props.intentionsStore}/>
                            <Intentions name={this.props.name} intentionsStore={this.props.intentionsStore}/>
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