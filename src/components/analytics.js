import { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

class RecordPageView extends Component {
    constructor(props) {
        super(props);

        // Initial page load - only fired once
        this.sendPageChange(props.location.pathname, props.location.search);
    }

    componentWillReceiveProps(nextProps) {
        // When props change, check if the URL has changed or not
        if (
            this.props.location.pathname !== nextProps.location.pathname ||
            this.props.location.search !== nextProps.location.search
        ) {
            this.sendPageChange(
                nextProps.location.pathname,
                nextProps.location.search
            );
        }
    }

    sendPageChange(pathname, search = "") {
        const page = pathname + search;
        ReactGA.set({ page });
        ReactGA.pageview(page);
    }

    render() {
        return this.props.children;
    }
}
export default withRouter(RecordPageView);
