import React, {Component} from 'react'
import {MapPointView} from '../components/map'

class ExploreScene extends Component {
    render(){
        return <MapPointView lat={0.0} lng={0.0}/>
    }
}

export {ExploreScene}
