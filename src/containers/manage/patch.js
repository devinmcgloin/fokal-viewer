import React, { Component } from 'react';
import { Patch } from '../../services/api/patch';
import { FetchMe } from '../../services/api/retrieval';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import Raven from 'raven-js';
import { Link, Route, Switch } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { TextArea, TextField } from '../../components/fields';
import { ErrorAlert, SuccessAlert } from '../../components/alerts';
import { ManageImages } from './images/patch';
import Dropzone from 'react-dropzone';
import { UploadAvatar } from '../../services/api/upload';

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'loading',
      avatar_links: undefined
    };

    bindAll(this, 'handleChange', 'commitChanges', 'handleFile');
  }

  componentDidMount() {
    FetchMe()
      .then(resp => {
        if (resp.ok)
          resp.body.then(d =>
            this.setState({
              user: d,
              bio: d.bio,
              portfolio: d.url,
              name: d.name,
              location: d.location,
              instagram: d.instagram,
              twitter: d.twitter,
              username: d.id,
              avatar_links: undefined,
              status: ''
            })
          );
        else this.setState({ status: 'failed' });
      })
      .catch(err => Raven.captureException(err));
  }

  handleChange(e) {
    const target = e.target;
    const name = target.name;

    this.setState({
      [name]: target.value
    });
  }

  handleFile(files) {
    const reader = new FileReader();

    reader.onload = () => {
      const blob = reader.result;

      UploadAvatar(blob).then(resp => {
        if (resp.ok) {
          this.setState({
            status: 'success'
          });
          resp.body.then(b => {
            this.setState({ avatar_links: b.links });
          });
        } else {
          this.setState({
            status: 'failure'
          });
        }

        setTimeout(() => this.setState({ status: '' }), 5000);
      });
    };

    reader.readAsArrayBuffer(files[0]);
  }

  commitChanges(e) {
    e.preventDefault();
    Patch('me', 'users', {
      bio: this.state.bio,
      url: this.state.portfolio,
      name: this.state.name,
      portfolio: this.state.portfolio,
      location: this.state.location,
      instagram: this.state.instagram,
      twitter: this.state.twitter,
      username: this.state.username
    }).then(
      resp =>
        resp.ok ? this.setState({ status: 'success' }) : this.setState({ status: 'failure' })
    );
    setTimeout(() => this.setState({ status: '' }), 5000);
  }

  render() {
    if (this.state.status === 'loading') return <Loading />;
    if (this.state.status === 'failed') return <Error />;
    let alert = null;
    if (this.state.status === 'success')
      alert = <SuccessAlert message="User Settings Changed." active={this.state.action !== ''} />;
    else if (this.state.status === 'failure')
      alert = (
        <ErrorAlert message="Failed to update user settings." active={this.state.action !== ''} />
      );

    return (
      <div className="sans-serif pt0 pb2 pv1-m pv2-ns">
        {alert}
        <div className="tc pv2 measure center">
          <Dropzone
            accept={'image/*'}
            multiple={false}
            onDropAccepted={this.handleFile}
            className={'center ma1 ba br2 b--dashed pa2'}
            acceptClassName={'center ma3 ba br2 b--dashed pa4 bg-washed-green'}
            rejectClassName={'center ma3 ba br2 b--dashed pa4 bg-washed-red'}
          >
            <img
              src={
                this.state.avatar_links
                  ? this.state.avatar_links.medium
                  : this.state.user.avatar_links.medium
              }
              alt="avatar"
              className="br1 h4 w4 dib"
            />
            <p className={'mh3 gray f7 tc  center measure-narrow'}>
              Drag and drop your files or browse from your computer
            </p>
          </Dropzone>
        </div>
        <div className="measure center">
          <form onSubmit={this.commitChanges}>
            <TextField
              handleChange={this.handleChange}
              name="name"
              val={this.state.name}
              desc="Your name will be displayed alongside your username."
              optional={true}
            />
            <TextField
              handleChange={this.handleChange}
              name="username"
              val={this.state.username}
              desc="Your username is how your account is referenced on the site (3 characters or more)"
              optional={false}
            />

            <TextField
              handleChange={this.handleChange}
              name="location"
              val={this.state.location}
              desc="Your location will appear on your profile and be available for searches."
              optional={true}
            />

            <TextField
              handleChange={this.handleChange}
              name="portfolio"
              val={this.state.portfolio}
              desc="The portfolio link is present on your profile page."
              optional={true}
            />

            <TextField
              handleChange={this.handleChange}
              name="instagram"
              val={this.state.instagram}
              desc="Adding your Instagram allows us to feature you on Instagram."
              optional={true}
            />

            <TextField
              handleChange={this.handleChange}
              name="twitter"
              val={this.state.twitter}
              desc="Adding your Twitter allows us to feature you on Twitter."
              optional={true}
            />

            <TextArea
              handleChange={this.handleChange}
              name="bio"
              val={this.state.bio}
              desc="Your bio is accessible in searches and on your profile page."
              optional={true}
            />

            <div className="mt3">
              <input
                className="f6 br2 ph5 pv3 mb2 dib shadow-5 bn glow pointer inline-flex items-center bg-animate bg-blue hover-bg-dark-blue white"
                type="Submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ManageUser.propTypes = {
  user: PropTypes.object.isRequired
};

const Account = ({ match }) => (
  <div className="sans-serif">
    <nav className="pa2 pa3-ns bb b--black-10 black-70 flex items-center">
      <div className="nowrap overflow-x-auto">
        <Link className="sans-serif link dim gray f6 f5-ns dib mr3" title="Images" to={match.url}>
          Account
        </Link>
        <Link
          className="sans-serif link dim gray f6 f5-ns dib mr3"
          title="Favorites"
          to={match.url + '/manage'}
        >
          Manage
        </Link>
      </div>
    </nav>
    <div className="w-100 pa3">
      <Switch>
        <Route exact path={match.url} render={() => <ManageUser />} />
        <Route path={match.url + '/manage'} render={() => <ManageImages />} />
      </Switch>
    </div>
  </div>
);
Account.propTypes = {
  match: PropTypes.object.isRequired
};

export { Account };
