import * as React from 'react';
import 'whatwg-fetch';

class Feedback extends React.Component {

    constructor(props) {
        super(props);

        this.feedbackStore = props.feedbackStore;

        this.state = {
            email: "",
            message: ""
        };
    }

    render() {
        return (
            <Jumbotron>
                <strong>Please give feedback. For bug reports, please include your device and steps to reproduce.</strong>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>E-mail</ControlLabel>
                    <div className="input-group">
                        <FormControl
                            autoFocus="true"
                            componentClass="input"
                            placeholder="email"
                            onChange={this.emailChanged.bind(this)}
                            value={this.state.email}
                            maxLength="100"
                        />
                        <span className="input-group-btn">
                                <Button bsStyle="primary" onClick={this.addMessage.bind(this)}>Send feedback</Button>
                        </span>
                    </div>
                </FormGroup>
                <FormGroup controlId="formControlsSelect">
                    <ControlLabel>Feedback / Bug report</ControlLabel>
                    <div className="input-group">
                        <FormControl
                            autoFocus="true"
                            componentClass="textarea"
                            placeholder="... Please give feedback and include details about your computer/device if applicable ..."
                            onChange={this.messageChanged.bind(this)}
                            value={this.state.message}
                        />
                        <span className="input-group-btn">
                                    <Button bsStyle="primary" onClick={this.sendFeedback.bind(this)}>Send feedback</Button>
                            </span>
                    </div>
                </FormGroup>
            </Jumbotron>
        )
    }

    messageChanged(event) {
        this.setState({ message: event.target.value });
    }


    emailChanged(event) {
        this.setState({ email: event.target.value });
    }

    sendFeedback(event) {
        event.preventDefault();
        this.feedbackStore.sendFeedback(this.props.name, this.state.email, this.state.message);
    }
}

export default Feedback;

