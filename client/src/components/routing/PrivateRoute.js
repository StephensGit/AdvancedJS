import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Need to interact with the off state in our auth reducer so bringing in connect
import { connect } from 'react-redux';

// const PrivateRoute = props => {
// The rest operator will take in any other rcomponents passed in
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    // Check to see if authenticated
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  // Pull in all the state from the auth reducer
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
