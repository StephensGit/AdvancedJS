import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import './form.css';

import PropTypes from 'prop-types';

// const Register = props => {
// Destructuring instead of using props
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      // Can access these beacuse there being pulled from formData
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/myShop' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='myCard'>
          <h1 className='formH1'>Sign Up</h1>
          <h4 className='formLabels formSubHeadingBanner'>
            <i className='fas fa-user'></i> Create Your Account
          </h4>
          <form className='form formCard cardFont' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label className='name'>Name</label>
              <input
                type='text'
                name='name'
                value={name}
                onChange={e => onChange(e)}
                // required
              />
            </div>
            <div className='form-group'>
              <label className='name'>Email Address</label>
              <input
                type='email'
                placeholder='example@gmail.com'
                name='email'
                value={email}
                onChange={e => onChange(e)}
                // required
              />
            </div>
            <div className='form-group'>
              <label className='name'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='name'>Password</label>
              <input
                type='confirm password'
                name='password2'
                value={password2}
                onChange={e => onChange(e)}
              />
            </div>

            <button className='button submitBtn' type='submit'>
              Submit
            </button>

            <Link to='/'>
              {' '}
              <button className='button cancelBtn'>Cancel </button>
            </Link>
          </form>
          <p className='myLink'>
            Already have an account?{' '}
            <Link className='registerLink' to='/login'>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// Whenever using connect you have to actually export it
export default connect(mapStateToProps, { setAlert, register })(Register);
