import './_auth-form.scss';
import React from 'react';
import * as util from '../../lib/util';

const isRequired = (value, name) => {
  return value ? null : `${name} is required`;
}
const isEmail = (value) => {
  return value && value.indexOf('@') > 1 ? null : `${value} is not an email`;
}
const validation = {
  username: isRequired,
  email: (value, name) => isRequired(value, name) || isEmail(value),
  password: isRequired,
}

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      fullName: '',
      error: null,
      errors: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.currentTarget;
    this.setState(state => ({
      [name]: value,
      errors: {
        ...state.errors,
        [name]: validation[name] ? validation[name](value, name) : null,
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onComplete(this.state);
  }

  render() {
    const Input = ({ name, placeholder, type = 'text' }) => (
      <p>
        <input type={type} name={name} placeholder={placeholder || name}
          value={this.state[name]}
          onChange={this.handleChange} />

        {util.renderIf(this.state.errors[name],
          <span className="input-error">
            {this.state.errors[name]}
          </span>
        )}
      </p>
    );

    return (
      <form onSubmit={this.handleSubmit} className='user-form'>
        <Input name='username' />
        <Input name='password' type='password' />
        <Input name='fullName' placeholder='full name' />

        <button type="submit">{this.props.action}</button>
      </form>
    );
  }
}
