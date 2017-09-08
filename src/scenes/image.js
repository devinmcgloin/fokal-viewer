import React, {Component} from 'react'

import {ImageCardFull} from '../components/cards/image/image';
import PropTypes from 'prop-types';
import {FetchImage} from "../services/api/retrieval";
import {Loading} from "../components/loading"

class ImageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: {},
            id: props.match.params.id,
            isLoading: true,
            failed: false,
        };
    }

    loadImageFromServer() {
        let t = this;
        FetchImage(this.state.id)
            .then((data) => {
                if (data.ok)
                    data.body.then((b) =>
                        t.setState({
                            image: b,
                            isLoading: false,
                        })
                    );
                else
                    t.setState({isLoading: false, failed: true})
            })

    }

    componentDidMount() {
        this.loadImageFromServer()
    }

    render() {
        if (this.state.isLoading)
            return <Loading/>;
        return <ImageCardFull image={this.state.image}/>;
    }
}

ImageContainer.propTypes = {
    match: PropTypes.object
};

export {
    ImageContainer
};
