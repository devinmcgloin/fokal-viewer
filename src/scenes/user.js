import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route, Switch } from 'react-router-dom';
import { FetchImages, FetchUser, FetchUserImages } from '../services/api/retrieval';
import { Loading } from '../components/loading';
import { GridCollection } from '../components/collection';
import { Error } from '../components/error';
import { UserStatsCard, UserTitleCard } from '../components/cards/user';
import { ImageCard } from '../components/cards/image';
import moment from 'moment';

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
        };
    }

    loadUser() {
        let t = this;
        FetchUser(this.state.username).then(function(data) {
            if (data.ok)
                data.body.then(b =>
                    t.setState({
                        user: b,
                        isLoadingUser: false,
                        failed: false
                    })
                );
            else t.setState({ failed: true });
        });

        FetchUserImages(this.state.username).then(data => {
            if (data.ok)
                data.body.then(b =>
                    t.setState(prev => ({
                        images: b,
                        isLoadingImages: prev.isLoadingImages + 1
                    }))
                );
            else t.setState({ failed: true });
        });

        FetchImages('/users/' + this.state.username + '/favorites').then(data => {
            if (data.ok)
                data.body.then(b =>
                    t.setState(prev => ({
                        favorites: b,
                        isLoadingImages: prev.isLoadingImages + 1
                    }))
                );
            else t.setState({ failed: true });
        });
    }

    componentDidMount() {
        this.loadUser();
    }

    render() {
        if (this.state.failed) return <Error />;
        if (this.state.isLoadingImages !== 2 || this.state.isLoadingUser) return <Loading />;

        const usr = this.state.user;
        const userTitle = <UserTitleCard user={usr} key={usr.id} />;

        let init = { views: 0, favorites: 0, downloads: 0 };
        const s = this.state.images.reduce(
            (acc, cur) => ({
                views: acc.views + cur.stats.views,
                downloads: acc.downloads + cur.stats.downloads,
                favorites: acc.favorites + cur.stats.favorites
            }),
            init
        );

        return (
            <div className="sans-serif">
                <nav className="ph3 ph4-ns pv2 pv3-ns bb b--black-10 black-70">
                    <div className="nowrap overflow-x-auto">
                        <Link
                            className="sans-serif link dim gray    f6 f5-ns dib mr3"
                            title="Images"
                            to={this.props.match.url}
                        >
                            Images
                        </Link>
                        <Link
                            className="sans-serif link dim gray    f6 f5-ns dib mr3"
                            title="Favorites"
                            to={this.props.match.url + '/favorites'}
                        >
                            Favorites
                        </Link>
                        <Link
                            className="sans-serif link dim gray    f6 f5-ns dib mr3"
                            to={this.props.match.url + '/stats'}
                            title="Images"
                        >
                            Stats
                        </Link>
                    </div>
                </nav>

                <div className="pv3">
                    <div className="ph3 ph4-ns">
                        <Switch>
                            <Route
                                exact
                                path={this.props.match.url}
                                render={() => (
                                    <GridCollection
                                        cards={[userTitle].concat(
                                            this.state.images.map(i => (
                                                <ImageCard key={i.id} image={i} />
                                            ))
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path={this.props.match.url + '/favorites'}
                                render={() => (
                                    <GridCollection
                                        cards={[userTitle].concat(
                                            this.state.favorites.map(i => (
                                                <ImageCard key={i.id} image={i} />
                                            ))
                                        )}
                                    />
                                )}
                            />
                            <Route
                                path={this.props.match.url + '/stats'}
                                render={() => (
                                    <GridCollection
                                        cards={[
                                            userTitle,
                                            <UserStatsCard
                                                key="views"
                                                title="Views"
                                                value={s.views.toLocaleString()}
                                                background="linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)"
                                            />,
                                            <UserStatsCard
                                                key="downloads"
                                                title="Downloads"
                                                value={s.downloads.toLocaleString()}
                                                background="linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)"
                                            />,
                                            <UserStatsCard
                                                key="favorites"
                                                title="Favorites"
                                                value={s.favorites.toLocaleString()}
                                                background="linear-gradient(19deg, #3EECAC 0%, #EE74E1 100%)"
                                            />,
                                            <UserStatsCard
                                                key="joined"
                                                title="Joined"
                                                value={moment(usr.created_at).fromNow()}
                                                background="linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)"
                                            />
                                        ]}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

UserContainer.propTypes = {
    match: PropTypes.object
};

export { UserContainer };
