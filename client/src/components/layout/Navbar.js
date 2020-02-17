import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../actions/auth';

// Destructuring auth to pull out isAuthenticated and loading
const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul className='navbar-nav ml-auto nav d-inline align-middle justify-content-end'>
      <li className='nav-item hover'>
        <Link className='nav-link hover' to='/coffees'>
          Coffee Shops
        </Link>
      </li>
      <li className='nav-item hover'>
        <Link className='nav-link hover' to='/myShop'>
          <span>Myshop</span>
        </Link>
      </li>
      <li className='nav-item hover'>
        <a className='nav-link hover' onClick={logout} href='#!'>
          <span>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='navbar-nav ml-auto nav d-inline align-middle justify-content-end'>
      <li className='nav-item hover'>
        <Link className='nav-link hover' to='/coffees'>
          Coffee
        </Link>
      </li>
      <li className='nav-item hover'>
        <Link className='nav-link hover' to='/register'>
          Register
        </Link>
      </li>
      <li className='nav-item hover'>
        <Link className='nav-link hover' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
      <h1>
        <Link className='navbar-brand' to='/'>
          <h3 className='logo d-inline align-middle'>
            <span className='logoBold'>Dublin</span>
            <span className='logoReg'>Coffee</span>
          </h3>
        </Link>
      </h1>
      {/* // Checks to see if logged in or not, then displays appropriate links  */}
      <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
    </nav>
  );
};

// Prop Types
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
