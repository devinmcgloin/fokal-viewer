import React, {Component} from 'react'
import {bindAll} from 'lodash'
import {UploadImage} from "../../services/api/upload";
import {FetchImage} from "../../services/api/retrieval";
import {ErrorAlert, InfoAlert, SuccessAlert} from '../../components/alerts'
import {PatchImage} from "./patch";

class UploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uri: null,
            contentType: null,
            processing: false,
            patch: {},
            failed: false,
            filename: null,
            succeeded: false,
            image: null
        };

        bindAll(this, 'handleSubmit', 'handleFile')
    }


    handleSubmit(e) {
        e.preventDefault();
        this.setState({processing: true});

        // send to server
        UploadImage(this.state.uri)
            .then(
                (data) => {
                    this.setState({processing: false, succeeded: true, imageID: data.id});
                    FetchImage(data.id)
                        .then(data => this.setState({image: data}))
                },
                () => {
                    this.setState({processing: false, failed: true});
                });

    }

    handleFile(e) {
        const reader = new FileReader(),
            file = e.target.files[0],
            path = e.target.value;

        let fileName = path.split("\\").pop();

        reader.onload = (upload) => {
            console.log(upload);
            this.setState({
                uri: upload.target.result,
                contentType: file.type,
                filename: fileName,
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
                {this.state.succeeded ?
                    <SuccessAlert message="Upload Succeded."/>
                    :
                    null}

                <div className="mw6 pa5 ma4 tc center">
                    {this.state.succeeded && this.state.image !== null ?
                        <PatchImage image={this.state.image}/>
                        :
                        <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <input type="file" name="file" id="file" style={hiddenInput} onChange={this.handleFile}/>
                            <label htmlFor="file"
                                   className="f6 link dim ba ph5 pv3 mb2 dib dark-gray pointer inline-flex items-center">{
                                this.state.filename || "Choose a file"}</label>
                            <input
                                className="f6 link dim ba ph5 pv3 mb2 dib dark-gray pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                                type="Submit" value="Upload" readOnly/>
                        </form>
                    }
                </div>

            </div>


        )
    }
}

export {UploadContainer};