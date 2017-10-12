import './_navbar.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import * as authActions from '../../action/auth-actions';
import * as profileActions from '../../action/profile-actions';
import * as util from '../../lib/util';

let NavLink = props => (
  <li className={util.classToggler({
    selected: props.url === props.to
  })}>
    {props.url === props.to ?
      <span>{props.children}</span> :
      <Link to={props.to}>
        {props.children}
      </Link>
    }
  </li>
)
class NavBar extends React.Component {
  handleLogout = () => {
    this.props.logout();
  };

  render() {
    const { url } = this.props.match;
    return (
      <nav>
        {this.props.loggedIn ?
          <ul>
              <NavLink to='/dashboard' url={url}>dashboard</NavLink>
              <NavLink to='/settings' url={url}>settings</NavLink>
              <li><a onClick={this.handleLogout} href="#">logout</a></li>
          </ul> :
          <ul>
            <NavLink to='/welcome/signup' url={url}>signup</NavLink>
            <NavLink to='/welcome/login' url={url}>login</NavLink>
          </ul>
        }

        {util.renderIf(this.props.userProfile,
          <span>has profile</span>)}
      </nav>
    );
  }
}

export default connect(
  state => ({
    loggedIn: !!state.auth,
    userProfile: state.userProfile,
  }),
  dispatch => ({
    logout: () => dispatch(authActions.logout()),
  })
)(NavBar);
