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
                <div>
                    <h1 className="f-headline lh-solid">Tags</h1>
                    <NotImplemented/>
                </div>
                <div>
                    <h1 className="f-headline lh-solid">Locations</h1>
                    <NotImplemented/>
                </div>

            </div>
        )
    }
}

export {ExploreScene}
