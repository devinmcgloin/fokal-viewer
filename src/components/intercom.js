import { Component } from "react";
import PropTypes from "prop-types";

class IntercomUpdate extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.sendPageView();
        this.context.router.history.listen(this.sendPageView);
    }

    sendPageView() {
        window.Intercom("update");
    }

    render() {
        return this.props.children;
    }
}

export default IntercomUpdate;
