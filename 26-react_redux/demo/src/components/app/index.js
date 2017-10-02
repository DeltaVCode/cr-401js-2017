import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

export default class App extends React.Component {
  render() {
    return (
      <section>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={() => <h1>Hi</h1>} />
            <Route exact path='/test' component={() => <h1>Test</h1>} />
            <Route component={() => <h1>Not Found</h1>} />
          </Switch>
        </BrowserRouter>
      </section>
    );
  }
}
