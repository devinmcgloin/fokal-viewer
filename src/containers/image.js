import React, {
    Component
} from 'react'

import {
    Image
} from '../components/image';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import {LoadImage} from '../api'
import {FetchImage} from '../api'

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageShortcode: props.match.params.id,
        };
    }

    loadImageFromServer() {
        let t = this;
        FetchImage(this.state.imageShortcode)
            .then(function (data) {
                t.setState({
                    image: data
                })
            });

    }

    componentDidMount() {
        this.loadImageFromServer()
    }

    render() {
        if (this.state.image === null)
            return (<ReactLoading type='cubes' color='#000000' height={100} width={100}/>);
        else
            return (<Image image={this.state.image}/>);
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export {
    ImageContainer
};
