import React from 'react'
import PropTypes from 'prop-types';
import {FetchUser} from '../api'
import {User} from '../components/user'
import {Image} from "../components/image";
import {ImageContainer} from "./image";
import {ImageCollection, UserImages} from "./collection";

class UserContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.match.params.id,
            user: null,
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

    }

    componentDidMount() {
        this.loadUser()
    }

    render() {
        return (
            <div>
                <User {...this.state.user}/>
                <ImageCollection title="" url={'/u/' + this.state.username + '/images?limit=4'}/>
            </div>
        )
    }
}


UserContainer.propTypes = {
    match: PropTypes.object
};

export {UserContainer};