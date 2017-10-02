import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import createAppStore from '../../lib/store';
import { Provider } from 'react-redux';

const store = createAppStore();

export default class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => {
      console.log('__STATE__', store.getState());
    });

    store.dispatch({ type: 'INIT' });

    setTimeout(() => {
      store.dispatch({ type: 'CATEGORY_CREATE', payload: { title: 'Test' }})
    }, 2000);
  }

  render() {
    return (
      <section>
        <Provider store={store}>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={() => <h1>Hi</h1>} />
              <Route exact path='/test' component={() => <h1>Test</h1>} />
              <Route component={() => <h1>Not Found</h1>} />
            </Switch>
          </BrowserRouter>
        </Provider>
      </section>
    );
  }
}
