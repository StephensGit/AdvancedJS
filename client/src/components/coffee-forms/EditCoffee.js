import React, { useState, Fragment, useEffect } from 'react';
// withRouter must be imported to use history object
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// This is used for both create and edit coffee
// getCurrentCoffee is used to pre fill the fields
import { createCoffee, getCurrentCoffee } from '../../actions/coffee';

import './CreateCoffeeStyle.css';

// const EditCoffee = props => {
const EditCoffee = ({
  // This gets the coffee state and loading-destructuring
  coffee: { coffee, loading },
  createCoffee,
  getCurrentCoffee,
  history
}) => {
  const [formData, setFormData] = useState({
    coffeeShopName: '',
    website: '',
    number: '',
    streetAddress: '',
    area: '',
    hours: ''
  });

  // useEffect is used to run get currentCoffee, so it will fetch the data and send it down through the state
  // Need to set the form data with the current coffee values
  // If it's loading or no coffee_ have a blank field otehrwise coffee_
  useEffect(
    () => {
      getCurrentCoffee();
      setFormData({
        coffeeShopName:
          loading || !coffee.coffeeShopName ? '' : coffee.coffeeShopName,
        website: loading || !coffee.website ? '' : coffee.website,
        number: loading || !coffee.number ? '' : coffee.number,
        streetAddress:
          loading || !coffee.streetAddress ? '' : coffee.streetAddress,
        area: loading || !coffee.area ? '' : coffee.area,
        hours: loading || !coffee.hours ? '' : coffee.hours
      });
    },
    // loading is the prop I want to depend on, so when it loads I want it to run
    [loading, getCurrentCoffee]
  );

  // Destructure so can use them as variables
  const {
    coffeeShopName,
    website,
    number,
    streetAddress,
    area,
    hours
  } = formData;

  // Spread operator to get the rest of the form data
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createCoffee(formData, history, true);
  };
  return (
    <Fragment>
      <div className='container'>
        <div className='myCard'>
          <h1 className='formH1'>Coffee Shop Info</h1>
          <h4 className='labels subHeadingBanner'>
            <i className='fas fa-user' /> Please edit your coffee shop's details
            below
          </h4>

          <form className='form formCard cardFont' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label className='name'>Coffee Shop Name</label>
              <input
                className='col input'
                type='text'
                // placeholder='coffeeShopName'
                name='coffeeShopName'
                value={coffeeShopName}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label className='name'>Website</label>
              <input
                className='col input'
                type='text'
                // placeholder='Website'
                name='website'
                value={website}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label className='name'>Number</label>
              <input
                className='col input'
                type='text'
                // placeholder='Number'
                name='number'
                value={number}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label className='name'>Street address</label>
              <input
                className='col input'
                type='text'
                // placeholder='Address'
                name='streetAddress'
                value={streetAddress}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label className='name'>Area</label>
              <input
                className='col input'
                type='text'
                // placeholder='Address'
                name='area'
                value={area}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label className='name'>Hours</label>
              <input
                className='col input'
                type='text'
                // placeholder='Hours'
                name='hours'
                value={hours}
                onChange={e => onChange(e)}
              />
            </div>

            <button className='button submitBtn' type='submit'>
              Submit
            </button>

            <Link to='/myShop'>
              {' '}
              <button className='button cancelBtn'>Cancel </button>
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

EditCoffee.propTypes = {
  createCoffee: PropTypes.func.isRequired,
  getCurrentCoffee: PropTypes.func.isRequired,
  coffee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coffee: state.coffee
});

// Bring in the coffee state using mapStateToProps
export default connect(mapStateToProps, { createCoffee, getCurrentCoffee })(
  withRouter(EditCoffee)
);
