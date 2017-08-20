import React from 'react'
import PropTypes from 'prop-types';
import {Route} from 'react-router-dom'
import {FetchImages, FetchUser, FetchUserImages} from '../services/api/api'
import {UserStats, UserHeader} from '../components/user'
import {Loading} from "../components/loading"
import {GridCollection} from "../components/collection";

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

        FetchImages('/u/' + this.state.username + '/favorites')
            .then((data)=>{
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
        if (this.state.isLoadingImages !== 2 || this.state.isLoadingUser )
            return <Loading/>;
        return (
            <div>
                <UserHeader user={this.state.user}/>
                <div className="ph3 ph4-ns">
                    <switch>
                        <Route
                            exact
                            path={this.props.match.url}
                            render={() => <GridCollection images={this.state.images}/>}
                        />
                        <Route
                            path={this.props.match.url + '/favorites'}
                            render={() => <GridCollection images={this.state.favorites}/>}
                        />
                        <Route
                            path={this.props.match.url + '/stats'}
                            render={() => <UserStats images={this.state.images}/>}
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