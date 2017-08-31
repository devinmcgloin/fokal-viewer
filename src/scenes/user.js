import React from 'react'
import PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom'
import {FetchImages, FetchUser, FetchUserImages} from '../services/api/api'
import {Loading} from "../components/loading"
import {GridCollection} from "../components/collection";
import FontAwesome from 'react-fontawesome'

class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.id,
            user: {},
            images: [],
            favorites: [],
            isLoadingUser: true,
            isLoadingImages: 0
        }
    }

    loadUser() {
        let t = this;
        FetchUser(this.state.username)
            .then(function (data) {
                console.log(data);
                t.setState({
                    user: data,
                    isLoadingUser: false
                })
            });

        FetchUserImages(this.state.username)
            .then((data) => {
                t.setState((prev) => ({
                    images: data,
                    isLoadingImages: prev.isLoadingImages + 1
                }))
            });

        FetchImages('/users/' + this.state.username + '/favorites')
            .then((data) => {
                t.setState((prev) => ({
                    favorites: data,
                    isLoadingImages: prev.isLoadingImages + 1
                }))
            })

    }

    componentDidMount() {
        this.loadUser()
    }

    render() {
        if (this.state.isLoadingImages !== 2 || this.state.isLoadingUser)
            return <Loading/>;

        const usr = this.state.user;
        const userTitle = <div className="pa4 ba"
                               style={{background: "linear-gradient( rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2) ), url(" + usr.avatar_links.medium + ") center"}}>
            <h1 className="f4 f2-l fw7 mt0 pv3 bb near-white b--near-white ">@{usr.id}</h1>
            <span className="f6 fw7 lh-solid near-white dim">{usr.location}</span>
            <p className="lh-copy mt2 tc mt3-m mt5-l f6 near-white">
                <span className="fw9 f4 f1-l db lh-title mb3 mb4-l">{usr.bio}</span>

                <ul className="list pa1 tc">
                    <li className="dib mr2">
                        <a href={usr.url} className="f7 f6-ns b db pa2 link dim moon-gray">
                            <FontAwesome name="link"/> Portfolio</a>
                    </li>
                    <li className="dib mr2">
                        <Link to={this.props.match.url} className="f7 f6-ns b db pa2 link dim moon-gray">
                            <FontAwesome name="image"/> Images</Link>
                    </li>
                    <li className="dib mr2">
                        <Link to={this.props.match.url + '/favorites'} className="f7 f6-ns b db pa2 link dim moon-gray">
                            <FontAwesome name="heart-o"/> Favorites</Link>
                    </li>
                    <li className="dib mr2">
                        <Link to={this.props.match.url + '/geo'} className="f7 f6-ns b db pa2 link dim moon-gray">
                            <FontAwesome name="map-o"/> Geo</Link>
                    </li>
                    <li className="dib mr2">
                        <Link to={this.props.match.url + '/stats'} className="f7 f6-ns b db pa2 link dim moon-gray">
                            <FontAwesome name="line-chart"/> Stats</Link>
                    </li>
                </ul>
            </p>

        </div>;

        return (
            <div className="pv3">
                <div className="ph3 ph4-ns">
                    <switch>
                        <Route
                            exact
                            path={this.props.match.url}
                            render={() => <GridCollection headerCards={[userTitle]} images={this.state.images}/>}
                        />
                        <Route
                            path={this.props.match.url + '/favorites'}
                            render={() => <GridCollection headerCards={[userTitle]} images={this.state.favorites}/>}
                        />
                        <Route
                            path={this.props.match.url + '/stats'}
                            render={() => <GridCollection headerCards={[userTitle]} images={this.state.images}/>}
                        />
                    </switch>
                </div>


            </div>
        )

    }
}


UserContainer.propTypes = {
    match: PropTypes.object
};

export {UserContainer};