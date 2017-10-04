import React from 'react';

export default class CardForm extends React.Component {
  constructor(props){
    super(props);

    this.state = Object.assign({ title: '', categoryID: props.categoryID }, props.card);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.card) {
      this.setState(props.card);
    }
  }

  handleChange(e) {
    let { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSave(Object.assign({}, this.state));
    this.setState({ title: '' });
  }

  render() {
    return (
      <form className='card-form' onSubmit={this.handleSubmit}>
        <input
          name='title'
          type='text'
          placeholder='Content'
          value={this.state.title}
          onChange={this.handleChange}
        />

        <button type="submit">{this.props.buttonText}</button>
      </form>
    )
  }
}
