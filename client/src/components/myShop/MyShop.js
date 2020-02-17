// This is where we're going to fetch all the data using an action
// Then bring it in from redux state and then we'll pass it down to other components

import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentCoffee, deleteCoffee } from '../../actions/coffee';

import './myShop.css';

const MyShop = ({
  getCurrentCoffee,
  // forgot to add this for ages and delete wouldn't work
  deleteCoffee,
  auth: { user },
  coffee: { coffee }
}) => {
  useEffect(() => {
    getCurrentCoffee();
  }, [getCurrentCoffee]);

  return (
    <Fragment>
      <div className='container'>
        <div className='myCard'>
          <h1 className='formH1'>{coffee && coffee.coffeeShopName}</h1>
          <p className='mystoreLabels mystoreSubHeadingBanner'>
            Welcome {user && user.name}, make changes to your shop here.
          </p>
          {coffee !== null ? (
            <Fragment>
              <Link to='/edit-coffee'>
                {' '}
                <button className='button submitBtn'>Edit Coffee </button>
              </Link>

              <Link to='/'>
                {' '}
                <button
                  className='button btn-danger'
                  onClick={() => deleteCoffee()}
                >
                  delete{' '}
                </button>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <p>You've no coffee shops</p>
              <Link to='/create-coffee'>
                <button className='button submitBtn'>
                  Create Coffee Shops
                </button>
              </Link>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

MyShop.propTypes = {
  getCurrentCoffee: PropTypes.func.isRequired,
  deleteCoffee: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  coffee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  coffee: state.coffee
});
export default connect(mapStateToProps, { getCurrentCoffee, deleteCoffee })(
  MyShop
);
