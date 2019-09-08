import React from 'react';
import PropTypes from 'prop-types';
import s from './Controls.module.css';

const Controls = ({
  disabledPrev,
  disabledNext,
  handlePrevPub,
  handleNextPub,
}) => {
  const btnPrevClass = disabledPrev ? s.disabled : s.button;
  const btnNextClass = disabledNext ? s.disabled : s.button;
  return (
    <section className={s.controls}>
      <button
        type="button"
        disabled={disabledPrev}
        onClick={handlePrevPub}
        className={btnPrevClass}
      >
        Назад
      </button>
      <button
        type="button"
        disabled={disabledNext}
        onClick={handleNextPub}
        className={btnNextClass}
      >
        Вперед
      </button>
    </section>
  );
};

Controls.propTypes = {
  disabledPrev: PropTypes.bool.isRequired,
  disabledNext: PropTypes.bool.isRequired,
  handlePrevPub: PropTypes.func.isRequired,
  handleNextPub: PropTypes.func.isRequired,
};

export default Controls;
