import React from 'react';
import {connect} from 'react-redux';
import ProfileForm from '../profile-form';
import {profileCreateRequest} from '../../action/profile-actions.js';

class SettingsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleProfileCreate = this.handleProfileCreate.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  handleProfileCreate(profile) {
    console.log(profile);
    return this.props.profileCreate(profile)
      .then(res => {
        console.log('profile created', res);
        if (this.props.location.search) {
          // TODO: check for from query parameter
          console.log(this.props.location.search);
          // TODO: this.props.history.push(from);
        }
      })
      .catch(console.error);
  }

  handleProfileUpdate(profile) {
    // TODO
  }

  render() {
    return (
      <div className='settings-container'>
        <h2>Profile Settings:</h2>
        <ProfileForm
          buttonText='create profile'
          onComplete={this.handleProfileCreate}
          />
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  profile: state.profile,
});

let mapDispatchToProps = (dispatch) => ({
  profileCreate: (profile) => dispatch(profileCreateRequest(profile)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);
