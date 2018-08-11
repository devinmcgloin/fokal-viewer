import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CallToAction = ({ title, message, call }) => (
    <section className="sans-serif ph3 ph5-ns pv5">
        <article className="mw8 center br2 ba b--light-blue bg-lightest-blue">
            <div className="dt-ns dt--fixed-ns w-100">
                <div className="pa3 pa4-ns dtc-ns v-mid">
                    <div>
                        <h2 className="fw4 blue mt0 mb3">{title}</h2>
                        <p className="black-70 measure lh-copy mv0">{message}</p>
                    </div>
                </div>
                <div className="pa3 pa4-ns dtc-ns v-mid">
                    <Link
                        to="/join"
                        className="no-underline f6 tc db w-100 pv3 bg-animate bg-blue hover-bg-dark-blue white br2 mv2"
                    >
                        {call}
                    </Link>
                    <Link
                        to="/login"
                        className="no-underline f6 tc db w-100 pv3 bg-animate bg-green hover-bg-dark-green white br2 mv2"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </article>
    </section>
);

CallToAction.propTypes = {
    title: PropTypes.string.isRequired,
    call: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default CallToAction;
