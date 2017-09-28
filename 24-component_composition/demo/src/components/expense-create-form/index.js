import React from 'react';

export default class ExpenseCreateForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      title: '',
      price: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleExpenseCreate(this.state);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          name='title'
          type='text'
          value={this.state.title}
          onChange={this.handleChange}
          />
        <input
          name='price'
          type='number'
          value={this.state.price}
          onChange={this.handleChange}
          />
        <button type='submit'>Add</button>
      </form>
    );
  }
}
