// Need to bring in useEffect because as soon as this coffee shop loads, need to call getCoffees action
import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CoffeeItem from './CoffeeItem';
import { getCoffees } from '../../actions/coffee';

const Coffees = ({ getCoffees, coffee: { coffees } }) => {
  useEffect(() => {
    getCoffees();
  }, [getCoffees]);
  return (
    <Fragment>
      <div className='container'>
        <h1 className='labels'>Coffee Shops</h1>
        <h4 className='labels subHeadingBanner'>Browse all Coffee shops!</h4>
      </div>
      {coffees.length > 0 ? (
        coffees.map(coffee => <CoffeeItem key={coffee._id} coffee={coffee} />)
      ) : (
        <h4>No Coffee shops found...</h4>
      )}
    </Fragment>
  );
};

Coffees.propTypes = {
  getCoffees: PropTypes.func.isRequired,
  coffee: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  coffee: state.coffee
});

export default connect(mapStateToProps, { getCoffees })(Coffees);
