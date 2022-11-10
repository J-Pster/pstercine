import React from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

import Circular from '../Subcomponents/Circular';
import { getImageUrl } from '../../utils/Request';

import './Card.scss';

function Card({ film }) {
  const {
    poster_path: posterPath,
    vote_average: voteAverage,
    title,
    release_date: releaseDate,
  } = film;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/filmes/${film.id}`);
  };

  return (
    <div aria-label="button" role="button" className="app__flex app__card" onClick={() => handleClick()}>
      <img src={getImageUrl(posterPath, 'w300')} alt="Capa do filme" />
      <div className="app__card-infos">
        <div className="left-side">
          <h2>{title}</h2>
          <h4>{new Date(releaseDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'numeric' })}</h4>
        </div>
        <div className="right-side">
          <Circular value={voteAverage * 10} />
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    overview: PropTypes.string,
    backdrop_path: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
  }).isRequired,
};

export default Card;
