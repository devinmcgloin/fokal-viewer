import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { bindAll } from 'lodash';
import { UploadImage } from '../../services/api/upload';
import { FetchImage } from '../../services/api/retrieval';
import { ErrorAlert, InfoAlert, SuccessAlert } from '../../components/alerts';
import { Loading } from '../../components/loading';
import { Exif, Tags, Geo, Gear } from './images/patch';
import { LoggedIn } from '../../services/store/auth';
import { Image } from '../../components/image';
import Dropzone from 'react-dropzone';
import FontAwesome from 'react-fontawesome';

class ImageModify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      image: {},
      progress: 0
    };
    bindAll(this, 'componentDidMount', 'handleSubmit');
  }

  componentDidMount() {
    FetchImage(this.props.match.params.id).then(resp =>
      resp.body.then(d => this.setState({ image: d, status: '' }))
    );
  }

  handleSubmit() {
    this.setState(prev => {
      return { progress: prev.progress + 1 };
    });
  }

  render() {
    if (this.state.status === 'loading') return <Loading />;
    if (!LoggedIn()) return <Redirect to="/" />;

    let stage;
    if (this.state.progress === 0)
      stage = <Exif onSubmit={this.handleSubmit} buttonValue="Next" image={this.state.image} />;
    else if (this.state.progress === 1)
      stage = <Tags onSubmit={this.handleSubmit} buttonValue="Next" image={this.state.image} />;
    else if (this.state.progress === 2)
      stage = <Gear onSubmit={this.handleSubmit} buttonValue="Next" image={this.state.image} />;
    else if (this.state.progress === 3)
      stage = <Geo onSubmit={this.handleSubmit} buttonValue="Done" image={this.state.image} />;
    else
      stage = (
        <div className="pa3">
          <p className="lh-copy">
            You can upload more photos you are proud of or view other peoples images.
          </p>
          <div className="fl">
            <Link
              to="/upload"
              className="f6 br2 ph5-l ph4 pv3 mb2 mr3 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white no-underline"
            >
              Upload
            </Link>
            <Link
              to="/"
              className="f6 br2 ph5-l ph4 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white no-underline"
            >
              Browse
            </Link>
          </div>
        </div>
      );
    return (
      <div className="sans-serif pa3 center w-90">
        <div className="w-100 w-50-m w-50-l db dtc-ns v-mid-ns">
          <Image className="w-100" url={this.state.image.src_links.raw} />
        </div>
        <div className="db dtc-ns v-mid mw6 w-100 w-50-ns mt2 mt0-ns">
          <span className="db">{stage}</span>
        </div>
      </div>
    );
  }
}

ImageModify.propTypes = {
  match: PropTypes.object.isRequired,
  onContinue: PropTypes.func.isRequired
};

class ImageSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blob: null,
      preview: '',
      filename: null,
      status: '',
      id: null
    };

    bindAll(this, 'handleSubmit', 'handleFile');
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ status: 'processing' });

    // send to server
    UploadImage(this.state.blob).then(data => {
      data.body.then(d => {
        if (data.ok)
          this.setState({
            status: 'succeded',
            id: d.id
          });
        else this.setState({ status: 'failed', error: d.err });
      });
    });
  }

  handleFile(files) {
    this.setState({ status: '' });
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
    // if (!LoggedIn()) return <Redirect to="/login" />;
    return (
      <div className="sans-serif">
        {this.state.id && <Redirect to={'/manage/' + this.state.id} />}
        {this.state.status === 'processing' ? (
          <InfoAlert message="Upload in progress." active={this.state.action !== ''} />
        ) : null}

        {this.state.status === 'failed' ? (
          <ErrorAlert message={this.state.error} active={this.state.action !== ''} />
        ) : null}
        {this.state.status === 'succeded' ? (
          <SuccessAlert message="Upload Succeded." active={this.state.action !== ''} />
        ) : null}

        <div className="mw6 pa5 ma4 tc center">
          <form onSubmit={this.handleSubmit} encType="multipart/form-data">
            <Dropzone
              accept={'image/*'}
              multiple={false}
              className={'center ma3 ba br2 b--dashed pa4'}
              onDropAccepted={this.handleFile}
              acceptClassName={'center ma3 ba br2 b--dashed pa4 bg-washed-green'}
              rejectClassName={'center ma3 ba br2 b--dashed pa4 bg-washed-red'}
            >
              {({ acceptedFiles }) => {
                return acceptedFiles.length ? (
                  <div className={'dib v-mid center'}>
                    <img alt="upload preview" src={this.state.preview} />
                    <p className={'mh3 tc measure-narrow'}>{this.state.filename}</p>
                  </div>
                ) : (
                  <div className={'dib v-mid center'}>
                    <FontAwesome name={'file-image-o'} size={'3x'} />
                    <p className={'mh3 tc measure-narrow'}>
                      Drag and drop your files or browse from your computer
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
        </div>
      </div>
    );
  }
}
export { ImageSubmit, ImageModify };
