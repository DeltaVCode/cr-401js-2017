import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import LandingContainer from '../landing-container';
import SettingsContainer from '../settings-container';
import { tokenSet } from '../../action/auth-actions';

class App extends React.Component {
  componentDidMount() {
    let token = localStorage.token;
    if (token) {
      this.props.tokenSet(token);
    }
  }

  render() {
    return (
      <div className='cfgram'>
        <BrowserRouter>
          <section>
            <header>
              <h1>cfgram</h1>
              <nav>
                <ul>
                  <li><Link to='/welcome/signup'>signup</Link></li>
                  <li><Link to='/welcome/login'>login</Link></li>
                  <li><Link to='/settings'>settings</Link></li>
                </ul>
              </nav>
            </header>
            <Switch>
              <Route path='/welcome/:auth' component={LandingContainer} />
              <Route exact path='/settings' component={SettingsContainer} />
              <Route exact path='/' component={() => <div>Welcome to my app!</div>} />
              <Route component={() => <div>Not Found!</div>} />
            </Switch>
          </section>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    tokenSet: (token) => dispatch(tokenSet(token)),
  })
)(App);
