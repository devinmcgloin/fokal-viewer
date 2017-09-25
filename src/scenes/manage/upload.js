import React, { Component } from "react";
import { bindAll } from "lodash";
import { UploadImage } from "../../services/api/upload";
import { ErrorAlert, InfoAlert, SuccessAlert } from "../../components/alerts";
import Dropzone from "react-dropzone";
import FontAwesome from "react-fontawesome";

class UploadContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blob: null,
            preview: "",
            patch: {},
            filename: null,
            status: "",
            image: null
        };

        bindAll(this, "handleSubmit", "handleFile");
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ status: "processing" });

        console.log(this.state.blob);

        // send to server
        UploadImage(this.state.blob).then(data => {
            if (data.ok)
                data.body.then(d =>
                    this.setState({
                        status: "succeded"
                    })
                );
            else this.setState({ status: "failed" });
        });
    }

    handleFile(files) {
        this.setState({ status: "" });
        const reader = new FileReader();

        reader.onload = () => {
            const blob = reader.result;

            this.setState({
                blob: blob,
                filename: files[0].name,
                preview: files[0].preview
            });
        };

        reader.readAsArrayBuffer(files[0]);
    }

    render() {
        return (
            <div className="sans-serif">
                {this.state.status === "processing" ? (
                    <InfoAlert message="Upload in progress." />
                ) : null}

                {this.state.status === "failed" ? (
                    <ErrorAlert message="Upload failed." />
                ) : null}
                {this.state.status === "succeded" ? (
                    <SuccessAlert message="Upload Succeded." />
                ) : null}

                <div className="mw6 pa5 ma4 tc center">
                    {this.state.succeeded &&
                    this.state.image !== null ? null : (
                        <form
                            onSubmit={this.handleSubmit}
                            encType="multipart/form-data"
                        >
                            <Dropzone
                                accept={"image/*"}
                                multiple={false}
                                className={"center ma3 ba br2 b--dashed pa4"}
                                onDropAccepted={this.handleFile}
                                acceptClassName={
                                    "center ma3 ba br2 b--dashed pa4 bg-washed-green"
                                }
                                rejectClassName={
                                    "center ma3 ba br2 b--dashed pa4 bg-washed-red"
                                }
                            >
                                {({ acceptedFiles }) => {
                                    return acceptedFiles.length ? (
                                        <div className={"dib v-mid center"}>
                                            <img src={this.state.preview} />
                                            <p
                                                className={
                                                    "mh3 tc measure-narrow"
                                                }
                                            >
                                                {this.state.filename}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className={"dib v-mid center"}>
                                            <FontAwesome
                                                name={"file-image-o"}
                                                size={"3x"}
                                            />
                                            <p
                                                className={
                                                    "mh3 tc measure-narrow"
                                                }
                                            >
                                                Drag and drop your files or
                                                browse from your computer
                                            </p>
                                        </div>
                                    );
                                }}
                            </Dropzone>
                            <input
                                className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                                type="Submit"
                                value="Upload"
                                readOnly
                            />
                        </form>
                    )}
                </div>
            </div>
        );
    }
}

export { UploadContainer };
