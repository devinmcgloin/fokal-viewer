import React from 'react'
import PropTypes from 'prop-types';
import {FetchUser, FetchUserImages} from '../api'
import {User} from '../components/user'


class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.id,
            user: null,
            images: null
        }
    }

    loadUser() {
        let t = this;
        FetchUser(this.state.username)
            .then(function (data) {
                t.setState({
                    user: data
                })
            });

        FetchUserImages(this.state.username)
            .then((data) => {
            t.setState({
                images: data
            })
            })

    }

    componentDidMount() {
        this.loadUser()
    }

    render() {
        return (
            <User user={this.state.user} images={this.state.images} isLoading={this.state.user === null || this.state.images === null} isSummary={true} isGrid={true}/>

        )
    }
}


UserContainer.propTypes = {
    match: PropTypes.object
};

export {UserContainer};