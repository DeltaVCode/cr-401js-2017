import React from 'react';
import ReactDom from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <section>
        <h1>Pokemon Form Demo</h1>
      </section>
    );
  }
}

const container = document.createElement('main');
document.body.appendChild(container);
ReactDom.render(<App />, container);
