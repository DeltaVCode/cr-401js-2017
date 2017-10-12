import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import AuthForm from '../auth-form';
import * as util from '../../lib/util';
import { signupRequest, signinRequest } from '../../action/auth-actions';

class LandingContainer extends React.Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to='/' />;
    }

    const { params } = this.props.match;

    let handleComplete = params.auth === 'login' ?
      this.props.signin :
      this.props.signup;

    return (
      <div>
        <AuthForm
          action={params.auth}
          onComplete={handleComplete} />
      </div>
    );
  }
}

let mapStateToProps = state => ({
  loggedIn: !!state.auth,
});
let mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signupRequest(user)),
  signin: (user) => dispatch(signinRequest(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LandingContainer);
