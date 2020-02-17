import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

// import './form.css';

// Destructuring because login is a props and avoids doing props.login
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/myShop' />;
  }
  return (
    <Fragment>
      <div className='container'>
        <div className='myCard'>
          <h1 className='formH1'>Sign In</h1>
          <p className='formLabels formSubHeadingBanner'>
            <i className='fas fa-user'></i> Sign Into Your Account
          </p>
          <form className='form formCard cardFont' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label className='name'>Email Address</label>
              <input
                type='email'
                placeholder='example@gmail.com'
                name='email'
                value={email}
                onChange={e => onChange(e)}
              />
            </div>
            <div className='form-group'>
              <label className='name'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={e => onChange(e)}
                minLength='6'
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
            Don't have an account?{' '}
            <Link className='registerLink' to='/register'>
              Register
            </Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { login })(Login);
