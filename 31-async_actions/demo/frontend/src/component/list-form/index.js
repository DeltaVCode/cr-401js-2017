import './_list-form.scss';
import React from 'react';
import * as util from '../../lib/util.js';

class ListForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = props.list ? props.list : { name: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.list) {
      this.setState(props.list);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let {onComplete} = this.props;
    let result = onComplete(this.state);
    if (result instanceof Promise) {
      result.then(() => {
        this.setState({
          error: null,
          name: '',
        })
      })
      .catch(error => {
        console.warn(error);
        this.setState({
          error
        });
      })
    }
  }

  handleChange(e) {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className={util.classToggler({
          'list-form': true,
          'error': this.state.error
        })}
        >
        {this.state.error &&
          <p>
            <strong>{this.state.error.message}</strong>
          </p>}

        <input
          name='name'
          type='text'
          placeholder='enter a name'
          value={this.state.name}
          onChange={this.handleChange} />

        <button type='submit'>{this.props.buttonText}</button>
      </form>
    )
  }
}

export default ListForm;
