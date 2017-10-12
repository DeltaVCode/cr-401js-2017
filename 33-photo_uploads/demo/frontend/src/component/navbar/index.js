import './_navbar.scss';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
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
  render() {
    const { url } = this.props.match;
    return (
      <nav>
        <ul>
          <NavLink to='/welcome/signup' url={url}>signup</NavLink>
          <NavLink to='/welcome/login' url={url}>login</NavLink>
          <NavLink to='/settings' url={url}>settings</NavLink>
        </ul>
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
  })
)(NavBar);
