import React, { useState, Fragment } from 'react';
// withRouter must be imported to use history object
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCoffee } from '../../actions/coffee';

import './CreateCoffeeStyle.css';
// const CreateCoffee = props => {
const CreateCoffee = ({ createCoffee, history }) => {
  const [formData, setFormData] = useState({
    coffeeShopName: '',
    website: '',
    number: '',
    streetAddress: '',
    area: '',
    hours: ''
  });

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
          <h1 className='formH1'>Coffee shop Info </h1>
          <h4 className='labels subHeadingBanner'>
            <i className='fas fa-user' /> Please enter your coffee shop's
            details below.
          </h4>

          <form className='form formCard cardFont' onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label className='name'>Coffee Shop Name</label>
              <input
                className='col input'
                type='text'
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
                name='number'
                value={number}
                onChange={e => onChange(e)}
              />
            </div>

            <div className='form-group'>
              <label className='name'>Street Address</label>
              <input
                className='col input'
                type='text'
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
                name='hours'
                value={hours}
                onChange={e => onChange(e)}
              />
            </div>

            <button className='button submitBtn' type='submit'>
              Submit
            </button>

            <Link to='/coffees'>
              {' '}
              <button className='button cancelBtn'>Cancel </button>
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

CreateCoffee.propTypes = {
  createCoffee: PropTypes.func.isRequired
};

export default connect(null, { createCoffee })(withRouter(CreateCoffee));
