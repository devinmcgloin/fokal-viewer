import React, { Component } from "react";
import PropTypes from "prop-types";
import { Notification } from "react-notification";

const InfoAlert = ({ message }) => (
    <Alert message={message} action="Dismiss" title="Success" />
);

InfoAlert.propTypes = {
    message: PropTypes.string.isRequired
};

const ErrorAlert = ({ message }) => (
    <Alert message={message} action="Dismiss" title="Error" />
);
ErrorAlert.propTypes = {
    message: PropTypes.string.isRequired
};

const SuccessAlert = ({ message }) => (
    <Alert message={message} action="Dismiss" title="Success" />
);

SuccessAlert.propTypes = {
    message: PropTypes.string.isRequired
};

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true
        };
    }

    render() {
        return (
            <Notification
                isActive={this.state.active}
                message={this.props.message}
                action={this.props.action}
                title={this.props.title}
                onClick={() =>
                    this.setState(prev => {
                        return { active: !prev.active };
                    })}
                onDismiss={() =>
                    this.setState(prev => {
                        return { active: !prev.active };
                    })}
            />
        );
    }
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired
};

export { ErrorAlert, InfoAlert, SuccessAlert };
