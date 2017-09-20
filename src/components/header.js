import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import {slide as Menu} from 'react-burger-menu'
import FontAwesome from 'react-fontawesome'

const styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '-100px',
        top: '-100px'
    },
    bmBurgerBars: {
        background: '#333333'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#333333'
    },
    bmMenu: {
        background: '#ededed',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmItemList: {
        color: '#ededed',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
}

class HeaderContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    render() {
        return (
            <div>
                <Menu styles={styles} isOpen={this.state.isOpen}
                      onStateChange={state => this.setState({isOpen: state.isOpen})}>
                    <Link to={'/explore'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >Explore</Link>
                    <Link to={'/search/images'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >search</Link>
                    {this.props.isLoggedIn ?
                    <Link to={'/upload'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >Upload</Link> :
                    <Link to={'/join'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >Join</Link>}

                    {this.props.isLoggedIn ? 
                           
                            <Link to={'/account/settings'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >Account</Link>
                         :null}
          {this.props.isLoggedIn ? 
                           
                            <Link to={'/logout'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >Logout</Link>
                         :null}


                    <hr/>

                    <Link to={'/join'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >About</Link>
                    <Link to={'/join'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >API</Link>
                    <Link to={'/join'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >Roadmap</Link>
                    <Link to={'/join'} className={'sans-serif ttu link dim black b f3 f2-ns'}
                          onClick={() => this.setState((prev) => {
                              return {isOpen: !prev.isOpen}
                          })}
                    >source</Link>
                </Menu>
                <nav className="pa2 pa3-ns bb b--black-10 black-70 bg-white flex justify-between">

                    <FontAwesome name={'bars'}
                                 onClick={() => this.setState((prev) => {
                                     return {isOpen: !prev.isOpen}
                                 })}
                                 className={'link dim black hover pointer pa2'}/>

                    <Link className="sans-serif link dim black b f6 f5-ns dib mr3 tc pa2" to="/"
                          title="Home">Fokal</Link>

                      <Link to="/search/images">
                    <FontAwesome name={'search'}
                                 className={'link dim black hover pointer pa2'}/>
                         </Link>

                </nav>
            </div>


        );
    }
}

HeaderContainer.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    currentUser: PropTypes.object,
    menu: PropTypes.bool.isRequired,
};


export {HeaderContainer};
