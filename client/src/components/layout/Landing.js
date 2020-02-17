import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/coffees' />;
  }
  return (
    <section className='landing'>
      <div className='dark-overlay'>
        <div className='landing-inner'>
          <h1 className='labels labelsLanding'>Dublin Coffee Guide</h1>
          <p className='labels labelsLanding subHeadingBanner'>
            Welcome to The Dublin Coffee Guide. The definitive guide to Dublin’s
            top independent coffee shops.
          </p>
          <div className='col-lg-3 col-sm-6'>
            <Link to='/register'>
              <button className='button submitBtn' type='submit'>
                Register
              </button>
            </Link>
            <Link to='/login'>
              <button className='button cancelBtn' type='submit'>
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
