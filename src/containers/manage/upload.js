import React, {Component} from 'react'
import {bindAll} from 'lodash'
import {UploadImage} from '../../api'
import {InfoAlert, ErrorAlert} from '../../components/alerts'

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
                },
                () => {
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
        const hiddenInput = {
            width: '0.1px',
            height: '0.1px',
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
        };

        return (
            <div className="sans-serif">
                {this.state.processing ?
                    <InfoAlert message="Upload in progress."/>
                    :
                    null}

                {this.state.failed ?
                    <ErrorAlert message="Upload failed."/>
                    :
                    null}

                <div className="mw6 pa5 ma4 tc center">
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <input type="file" name="file" id="file" style={hiddenInput}/>
                        <label htmlFor="file"
                               className="f6 link dim ba ph5 pv3 mb2 dib dark-gray pointer inline-flex items-center">Choose
                            a file</label>
                    </form>
                </div>

            </div>


        )
    }
}

export {UploadContainer};