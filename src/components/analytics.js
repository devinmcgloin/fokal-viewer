import { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

class RecordPageView extends Component {
    componentDidMount(prevProps) {
        ReactGA.pageview(window.location.pathname + window.location.search);
    }

    render() {
        return this.props.children;
    }
}

S;
export default withRouter(RecordPageView);
