import React, {
    Component
} from 'react'

import {
    Image
} from '../components/image';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';
import {FetchImage} from '../services/api/api'

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
        return (<Image image={this.state.image} isLoading={this.state.image === null} isSummary={false}/>);
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export {
    ImageContainer
};
