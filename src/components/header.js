import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { slide as Menu } from "react-burger-menu";
import FontAwesome from "react-fontawesome";
import { bindAll } from "lodash";

const styles = {
    bmBurgerButton: {
        position: "fixed",
        width: "36px",
        height: "30px",
        left: "-100px",
        top: "-100px"
    },
    bmBurgerBars: {
        background: "#333333"
    },
    bmCrossButton: {
        height: "24px",
        width: "24px"
    },
    bmCross: {
        background: "#333333"
    },
    bmMenu: {
        background: "#ededed",
        padding: "2.5em 1.5em 0",
        fontSize: "1.15em"
    },
    bmItemList: {
        color: "#ededed",
        padding: "0.8em"
    },
    bmOverlay: {
        background: "rgba(0, 0, 0, 0.3)"
    }
};

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            searchActive: false,
            q: "",
            submitted: false
        };
    }
    render() {
        return (
            <div>
                <Menu
                    styles={styles}
                    isOpen={this.state.isOpen}
                    onStateChange={state =>
                        this.setState({ isOpen: state.isOpen })}
                >
                    <Link
                        to={"/explore"}
                        className={"sans-serif ttu link dim black b f3 f2-ns"}
                        onClick={() =>
                            this.setState(prev => {
                                return { isOpen: !prev.isOpen };
                            })}
                    >
                        Explore
                    </Link>
                    <Link
                        to={"/search/images"}
                        className={"sans-serif ttu link dim black b f3 f2-ns"}
                        onClick={() =>
                            this.setState(prev => {
                                return { isOpen: !prev.isOpen };
                            })}
                    >
                        search
                    </Link>
                    {this.props.isLoggedIn ? (
                        <Link
                            to={"/upload"}
                            className={
                                "sans-serif ttu link dim black b f3 f2-ns"
                            }
                            onClick={() =>
                                this.setState(prev => {
                                    return { isOpen: !prev.isOpen };
                                })}
                        >
                            Upload
                        </Link>
                    ) : (
                        <Link
                            to={"/join"}
                            className={
                                "sans-serif ttu link dim black b f3 f2-ns"
                            }
                            onClick={() =>
                                this.setState(prev => {
                                    return { isOpen: !prev.isOpen };
                                })}
                        >
                            Join
                        </Link>
                    )}

                    {this.props.isLoggedIn ? null : (
                        <Link
                            to={"/login"}
                            className={
                                "sans-serif ttu link dim black b f3 f2-ns"
                            }
                            onClick={() =>
                                this.setState(prev => {
                                    return { isOpen: !prev.isOpen };
                                })}
                        >
                            Login
                        </Link>
                    )}

                    {this.props.isLoggedIn ? (
                        <Link
                            to={"/account/settings"}
                            className={
                                "sans-serif ttu link dim black b f3 f2-ns"
                            }
                            onClick={() =>
                                this.setState(prev => {
                                    return { isOpen: !prev.isOpen };
                                })}
                        >
                            Account
                        </Link>
                    ) : null}

                    {this.props.isLoggedIn ? (
                        <Link
                            to={"/logout"}
                            className={
                                "sans-serif ttu link dim black b f3 f2-ns"
                            }
                            onClick={() =>
                                this.setState(prev => {
                                    return { isOpen: !prev.isOpen };
                                })}
                        >
                            Logout
                        </Link>
                    ) : null}

                    <hr />

                    <Link
                        to={"/why"}
                        className={"sans-serif ttu link dim black b f3 f2-ns"}
                        onClick={() =>
                            this.setState(prev => {
                                return { isOpen: !prev.isOpen };
                            })}
                    >
                        Why
                    </Link>

                    <a
                        target="_blank"
                        href={"https://github.com/fokal"}
                        className={"sans-serif ttu link dim black b f3 f2-ns"}
                    >
                        Source
                    </a>
                </Menu>
                <nav className="pa2 pa3-ns bb b--black-10 black-70 bg-white flex justify-between">
                    <FontAwesome
                        name={"bars"}
                        onClick={() =>
                            this.setState(prev => {
                                return { isOpen: !prev.isOpen };
                            })}
                        className={"link dim black hover pointer pa2"}
                    />

                    {this.state.searchActive || (
                        <Link
                            className="sans-serif link dim black b f6 f5-ns dib mr3 tc pa2"
                            to="/"
                            title="Home"
                        >
                            Fokal
                        </Link>
                    )}

                    {this.state.searchActive ? (
                        <SearchBox
                            onDismiss={() =>
                                this.setState({ searchActive: false })}
                            onSubmit={q => {
                                this.setState({ submitted: true, q: q });
                                setTimeout(
                                    () => this.setState({ submitted: false }),
                                    1000
                                );
                            }}
                        />
                    ) : (
                        <FontAwesome
                            name={"search"}
                            className={"link dim black hover pointer pa2"}
                            onClick={() =>
                                this.setState({ searchActive: true })}
                        />
                    )}
                </nav>
                {this.state.submitted && (
                    <Redirect
                        push
                        to={{
                            pathname: "/search/images",
                            search: "?q=" + encodeURIComponent(this.state.q)
                        }}
                    />
                )}
            </div>
        );
    }
}

HeaderContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.object
};

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            q: ""
        };

        bindAll(this, "handleTextChange");
    }

    handleTextChange(e) {
        this.setState({
            q: e.target.value
        });
    }

    render() {
        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    this.props.onSubmit(this.state.q);
                    this.props.onDismiss();
                }}
                className="w-60 flex"
            >
                <input
                    type="text"
                    id="query"
                    name="query"
                    autoFocus
                    onBlur={() => this.props.onDismiss()}
                    onChange={this.handleTextChange}
                    value={this.state.q}
                    className="dib pa2 fl bn white bg-black-70 input-reset br2 br--left outline-0"
                    style={{ flexGrow: "100" }}
                />
                <FontAwesome
                    name={"times"}
                    className={
                        "dib link dim white hover pointer pv2 ph3 fr bg-animate bg-black-80 hover-bg-black br2 br--right"
                    }
                    onClick={() => this.props.onDismiss()}
                />
            </form>
        );
    }
}

SearchBox.propTypes = {
    onDismiss: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export { HeaderContainer };
