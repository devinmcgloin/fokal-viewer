import React from 'react'
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom'
import {FetchImages, FetchUser, FetchUserImages} from '../services/api/retrieval'
import {Loading} from "../components/loading"
import {GridCollection} from "../components/collection";
import {Error} from "../components/error";
import {UserTitleCard} from "../components/cards/user/user";
import {ImageCardSmall} from "../components/cards/image/image";

class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.id,
            user: {},
            images: [],
            favorites: [],
            isLoadingUser: true,
            isLoadingImages: 0,
            failed: false
        }
    }

    loadUser() {
        let t = this;
        FetchUser(this.state.username)
            .then(function (data) {
                if (data.ok)
                    data.body.then(
                        b => t.setState({
                            user: b,
                            isLoadingUser: false,
                            failed: false
                        })
                    );
                else
                    t.setState({failed: true})

            });

        FetchUserImages(this.state.username)
            .then((data) => {
                if (data.ok)
                    data.body.then(
                        b => t.setState((prev) => ({
                            images: b,
                            isLoadingImages: prev.isLoadingImages + 1
                        }))
                    );
                else
                    t.setState({failed: true})
            });

        FetchImages('/users/' + this.state.username + '/favorites')
            .then((data) => {
                if (data.ok)
                    data.body.then(
                        b => t.setState((prev) => ({
                            favorites: b,
                            isLoadingImages: prev.isLoadingImages + 1
                        }))
                    );
                else
                    t.setState({failed: true})
            })

    }

    componentDidMount() {
        this.loadUser()
    }

    render() {
        if (this.state.failed)
            return <Error/>;
        if (this.state.isLoadingImages !== 2 || this.state.isLoadingUser)
            return <Loading/>;

        const usr = this.state.user;
        const userTitle = <UserTitleCard usr={usr} key={usr.id}/>;

        return (

            <div className="pv3">
                <div className="ph3 ph4-ns">
                    <switch>
                        <Route
                            exact
                            path={this.props.match.url}
                            render={() => <GridCollection
                                cards={[userTitle].concat(this.state.images.map(i => <ImageCardSmall key={i.id}
                                                                                                     image={i}/>))}/>}
                        />
                        <Route
                            path={this.props.match.url + '/favorites'}
                            render={() => <GridCollection
                                cards={[userTitle].concat(this.state.favorites.map(i => <ImageCardSmall key={i.id}
                                                                                                        image={i}/>))}/>}
                        />
                        <Route
                            path={this.props.match.url + '/stats'}
                            render={() => <GridCollection cards={[userTitle]}/>}
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