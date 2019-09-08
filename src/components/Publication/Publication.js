import React from 'react';
import PropTypes from 'prop-types';
import s from './Publication.module.css';

const Publication = ({ publication }) => (
  <article key={publication.id} className={s.publication}>
    <h2 className={s.title}>{publication.title}</h2>
    <p className={s.text}>{publication.text}</p>
  </article>
);

Publication.propTypes = {
  publication: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Publication;
