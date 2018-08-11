import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Notification } from 'react-notification';

const InfoAlert = ({ message, active }) => (
    <Alert
        message={message}
        active={active}
        action="Dismiss"
        title="Info"
        actionColor={'#3554f2'}
    />
);

InfoAlert.propTypes = {
    message: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

const ErrorAlert = ({ message, active }) => (
    <Alert
        message={message}
        active={active}
        action="Dismiss"
        title="Error"
        actionColor={'#f44336'}
    />
);
ErrorAlert.propTypes = {
    message: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

const SuccessAlert = ({ message, active }) => (
    <Alert
        message={message}
        active={active}
        action="Dismiss"
        title="Success"
        actionColor={'#37bf18'}
    />
);

SuccessAlert.propTypes = {
    message: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
};

class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: props.active
        };
    }

    render() {
        return (
            <Notification
                isActive={this.state.active}
                message={this.props.message}
                action={this.props.action}
                title={this.props.title}
                actionStyle={{ color: this.props.actionColor }}
                onClick={() =>
                    this.setState(prev => {
                        return { active: !prev.active };
                    })
                }
                onDismiss={() =>
                    this.setState(prev => {
                        return { active: !prev.active };
                    })
                }
            />
        );
    }
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    actionColor: PropTypes.string.isRequired
};

export { ErrorAlert, InfoAlert, SuccessAlert };
