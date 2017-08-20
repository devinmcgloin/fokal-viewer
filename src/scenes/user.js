import React from 'react'
import PropTypes from 'prop-types';
import {FetchUser, FetchUserImages} from '../services/api/api'
import {User} from '../components/user'
import {Loading} from "../components/loading"

class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.id,
            user: {},
            images: [],
            isLoadingUser: true,
            isLoadingImages: true
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
                console.log(data);

                t.setState({
                    images: data,
                    isLoadingImages: false
                })
            })

    }

    componentDidMount() {
        this.loadUser()
    }

    render() {
        if(this.state.isLoadingImages || this.state.isLoadingUser)
            return <Loading/>;
        return <User user={this.state.user} images={this.state.images}/>

    }
}


UserContainer.propTypes = {
    match: PropTypes.object
};

export {UserContainer};