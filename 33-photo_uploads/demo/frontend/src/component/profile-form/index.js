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
