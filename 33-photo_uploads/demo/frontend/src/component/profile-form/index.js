import './_profile-form.scss';
import React from 'react';
import * as util from '../../lib/util.js';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: '',
      avatar: null,
      ...props.profile,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let { type, name, value } = e.currentTarget;
    switch (type) {
      case 'file':
        let { files } = e.currentTarget;
        let [avatar] = files;
        this.setState({ avatar });

        util.photoToDataURL(avatar)
          .then(preview => this.setState({ preview }))
          .catch(console.error);

        break;
      default:
        this.setState({ [name]: value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    return (
      <form
        className='profile-form'
        onSubmit={this.handleSubmit}>

        {this.state.preview &&
          <img src={this.state.preview} />
        }

        <input
          type="file"
          name='avatar'
          onChange={this.handleChange} />

        <textarea
          name='bio'
          value={this.state.bio}
          onChange={this.handleChange} />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default ProfileForm;
