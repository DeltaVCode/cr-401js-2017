import './_category-form.scss';
import React from 'react';

export default class CategoryForm extends React.Component {
  constructor(props){
    super(props);

    this.state = Object.assign({ title: '' }, props.category);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.category) {
      this.setState(props.category);
    }
  }

  handleChange(e) {
    let { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.saveCategory(Object.assign({}, this.state));
    this.setState({ title: '' });
  }

  render() {
    return (
      <form className='category-form' onSubmit={this.handleSubmit}>
        <input
          name='title'
          type='text'
          placeholder='Category Name'
          value={this.state.title}
          onChange={this.handleChange}
        />

        <button type="submit">{this.props.buttonText}</button>
      </form>
    )
  }
}
