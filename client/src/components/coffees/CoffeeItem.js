// This represents an individual item in the list, child component of Coffee
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CoffeeItem = ({
  coffee: {
    user: { _id },
    coffeeShopName,
    area
  }
}) => {
  return (
    <div className=' col-lg-4 col-md-6 col-sm-12 mb-5'>
      <div className='card eventCard events'>
        <div className='card-body'>
          <h2 className='card-title eventh1'>{coffeeShopName}</h2>
          <h4 className='card-text genre'>{area}</h4>
          <Link to={`/coffee/${_id}`} className='btn-sm eventButton alignBtn'>
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

CoffeeItem.propTypes = {
  coffee: PropTypes.object.isRequired
};

export default CoffeeItem;
