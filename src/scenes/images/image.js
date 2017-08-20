import React, {
    Component
} from 'react'

import {
    Image
} from '../../components/image';
import PropTypes from 'prop-types';
import {FetchImage} from '../../services/api/api'
import {Loading} from "../../components/loading"
class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            id: props.match.params.id,
            isLoading: true,
        };
    }

    loadImageFromServer() {
        let t = this;
        FetchImage(this.state.id)
            .then(function (data) {
                t.setState({
                    image: data,
                    isLoading: false,
                })
            });

    }

    componentDidMount() {
        this.loadImageFromServer()
    }

    render() {
        if(this.state.isLoading)
            return <Loading/>;
        return <Image image={this.state.image} isSummary={false}/>;
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export {
    ImageContainer
};
