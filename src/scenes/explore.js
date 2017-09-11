import React, {Component} from 'react'
import {NotImplemented} from '../components/error'

class ExploreScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: [],
            users: [],
            tags: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className="pa3 sans-serif">
                <NotImplemented/>
            </div>
        )
    }
}

export {ExploreScene}
