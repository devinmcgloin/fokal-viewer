import ReactGA from "react-ga";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS);

const RecordPageView = () => {
    const { pathname, search } = window.location;
    ReactGA.set({ page: pathname + search });
    ReactGA.pageview(pathname + search);
    return null;
};
export default RecordPageView;
