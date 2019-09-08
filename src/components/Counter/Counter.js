import React from 'react';
import PropTypes from 'prop-types';
import s from './Counter.module.css';

const Counter = ({ currentValue, total }) => (
  <p className={s.counter}>
    {currentValue} / {total}
  </p>
);

Counter.propTypes = {
  currentValue: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default Counter;
