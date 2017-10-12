import './_auth-form.scss';
import React from 'react';
import * as util from '../../lib/util';

const isRequired = (value, name) => {
  return value ? null : `${name} is required`;
}
const isEmail = (value) => {
  return value && value.indexOf('@') > 1 ? null : `${value} is not an email`;
}

const defaultState = {
  username: '',
  email: '',
  password: '',
  fullName: '',
  error: null,
  errors: {},
};

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = defaultState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.updateValidation();
  }

  componentDidUpdate() {
    this.updateValidation();
  }

  updateValidation() {
    this.validation = {
      username: isRequired,
      password: isRequired,
    };
    if (this.props.action === 'signup') {
      this.validation.email =
        (value, name) => isRequired(value, name) || isEmail(value);
    }
  }

  Input = ({ name, placeholder, type = 'text' }) => (
    <p>
      <label>
        <input type={type} name={name} placeholder={placeholder || name}
          value={this.state[name]}
          onChange={this.handleChange} />

        {util.renderIf(this.state.errors[name],
          <span className="input-error">
            {this.state.errors[name]}
          </span>
        )}
      </label>
    </p>
  );

  handleChange(e) {
    const { name, value } = e.currentTarget;
    this.setState(state => ({
      [name]: value,
      errors: {
        ...state.errors,
        [name]: this.validation[name] ? this.validation[name](value, name) : null,
      }
    }))
  }

  validateAll() {
    this.setState(state => ({
      errors: Object.keys(this.validation)
        .reduce(
          (errors, name) => {
            let res = this.validation[name](state[name], name);
            if (res) { errors[name] = res; }
            return errors;
          }, {}),
    }));
    return Object.keys(this.state.errors).length === 0;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.validateAll()) {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    }
  }

  render() {
    console.log('render');
    return (
      <form onSubmit={this.handleSubmit} className='user-form'>
        {util.renderIf(this.props.action === 'signup',
          <this.Input name='email' />
        )}
        <this.Input name='username' />
        <this.Input name='password' type='password' />
        <this.Input name='fullName' placeholder='full name' />

        <button type="submit">{this.props.action}</button>
      </form>
    );
  }
}
