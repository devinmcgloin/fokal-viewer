import React, {Component} from 'react'
import {bindAll} from 'lodash'
import {UploadImage} from '../api'

class UploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            contentType: null,
            processing: false,
            patch: {},
            failed: false
        };

        bindAll(this, 'handleSubmit', 'handleFile')
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({processing: true});

        // send to server
        UploadImage(this.state.uri)
            .then(
                () => {
                    this.setState({processing: false});
                }, () => {
                    this.setState({processing: false, failed: true});
                });

    }

    handleFile(e) {
        const reader = new FileReader(),
            file = e.target.files[0];

        reader.onload = (upload) => {
            this.setState({
                uri: upload.target.result,
                contentType: file.type
            })
        };

        // reader.readAsDataURL(file);
        reader.readAsArrayBuffer(file);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                    <input type="file" onChange={this.handleFile} accept="image/*"/>
                    <input disabled={this.state.processing} className='btn btn-primary' type="submit" value="Upload"/>
                </form>

                {this.state.uri ? <img src={this.state.uri}/> : <div/>}
            </div>
        )
    }
}

export {UploadContainer};