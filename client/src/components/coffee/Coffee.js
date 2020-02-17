// // This is the parent component within this folder
// // This is where we'll bring in the state and bring in the actual coffee data.
// // Using the get coffee by id action that was created and need to get the id from the root from the URL

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import CoffeeInfo from './CoffeeInfo';
import { getCoffeeById } from '../../actions/coffee';

const Coffee = ({ getCoffeeById, coffee: { coffee }, match }) => {
  useEffect(() => {
    getCoffeeById(match.params.id);
  }, [getCoffeeById, match.params.id]);

  return (
    <Fragment>
      {coffee === null ? (
        <Fragment>
          <div className='container'>
            <div className='col-lg-6 col-md-6 col-sm-12 mb-5'>
              <p>Not found</p>

              <Link to='/coffees' className=''>
                <button className='col-lg-3 button cancelBtn'>Back</button>
              </Link>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className='container'>
            <div className='col-lg-6 col-md-6 col-sm-12 mb-5'>
              <CoffeeInfo coffee={coffee} />

              <Link to='/coffees' className=''>
                <button className='col-lg-3 button cancelBtn'>Back</button>
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Coffee.propTypes = {
  getCoffeeById: PropTypes.func.isRequired,
  coffee: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coffee: state.coffee,
  auth: state.auth
});

export default connect(mapStateToProps, { getCoffeeById })(Coffee);
