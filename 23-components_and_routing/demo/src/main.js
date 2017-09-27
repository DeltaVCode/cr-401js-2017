import './style/main.scss';

import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import About from './components/about';
import Dashboard from './components/dashboard';

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <h1>Home, Too</h1>
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: [],
    };
  }

  getApp() {
    return {
      state: this.state,
      setState: this.setState.bind(this),
    };
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  render() {
    return (
      <div>
        <nav>
          Nav goes here
        </nav>
        <main>
          <BrowserRouter>
            <section>
              <Switch>
                <Route exact path="/" component={() => <h1>Home</h1>} />
                <Route exact path="/home2" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/dashboard"
                  component={() => <Dashboard app={this.getApp()} />} />
                <Route component={() => <h1>Not Found</h1>} />
              </Switch>
            </section>
          </BrowserRouter>
        </main>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('root'));
