import ReactGA from "react-ga";
import { Component } from "react";
import PropTypes from "prop-types";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS, {
    debug: process.env.NODE_ENV !== "production"
});

class RecordPageView extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.sendPageView(this.context.router.history.location);
        this.context.router.history.listen(this.sendPageView);
    }

    sendPageView(location) {
        ReactGA.set({ page: location.pathname });
        ReactGA.pageview(location.pathname);
    }

    render() {
        return this.props.children;
    }
}

export default RecordPageView;
