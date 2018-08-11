import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import logo from '../assets/logo.svg';

const Header = () => (
    <nav className="pa2 pa3-ns bb b--black-10 black-70 bg-white flex items-center justify-between">
        <Link className="link dib mr3 tc" to="/" title="Home">
            <img src={logo} style={{ width: '3rem', height: '3rem' }} />
        </Link>
        <HeaderSearchBox />
        <HeaderMenuItems />
    </nav>
);

const HeaderSearchBox = () => (
    <div className="db" style={{ flexGrow: 2 }}>
        <input className="dib h2 bn input-reset br2 bg-near-white w-100" />
    </div>
);

class HeaderMenuItems extends React.Component {
    state = {
        isTooltipActive: false
    };
    toolTipStyle = {
        style: {
            padding: 20
        },
        arrowStyle: {
            color: 'rgba(0,0,0,.8)',
            borderColor: false
        }
    };
    showTooltip = () => this.setState({ isTooltipActive: true });
    hideTooltip = () => this.setState({ isTooltipActive: false });
    render = () => (
        <div className="db w2 mr3" style={{ flexGrow: 1 }}>
            <div className="flex justify-end">
                <div
                    ref={element => {
                        this.element = element;
                    }}
                    onMouseEnter={this.showTooltip}
                    onMouseLeave={this.hideTooltip}
                >
                    <FontAwesome name="ellipsis-v" />
                </div>
            </div>
        </div>
    );
}

export { Header };
