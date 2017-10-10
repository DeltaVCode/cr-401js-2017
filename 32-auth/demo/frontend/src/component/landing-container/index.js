import React from 'react';
import { connect } from 'react-redux';

import AuthForm from '../auth-form';
import * as util from '../../lib/util';

class LandingContainer extends React.Component {
  render() {
    const { params } = this.props.match;

    let handleComplete = params.auth === 'login' ?
      user => console.log('Login', user) :
      user => console.log('Sign Up', user);

    return (
      <div>
        <AuthForm
          action={params.auth}
          onComplete={handleComplete} />
      </div>
    );
  }
}

export default LandingContainer;
