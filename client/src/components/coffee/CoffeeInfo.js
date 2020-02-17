import React from 'react';
import PropTypes from 'prop-types';

const CoffeeInfo = ({
  coffee: { coffeeShopName, streetAddress, area, website, number, hours }
}) => {
  return (
    <div className='card eventCard events'>
      {/* <img className='round-img my-1' src={avatar} alt='' /> */}
      <div className='card-body'>
        <h1 className='card-title eventh1'>{coffeeShopName}</h1>

        <p className='card-text genre'>{streetAddress}</p>

        <p className='card-text genre'>{area}</p>

        <p className='card-text genre'>{website}</p>

        <p className='card-text genre'>{number}</p>

        <p className='card-text genre'>{hours}</p>
      </div>
    </div>
  );
};

CoffeeInfo.propTypes = {
  coffee: PropTypes.object.isRequired
};

export default CoffeeInfo;
