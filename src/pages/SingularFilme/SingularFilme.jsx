import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AppWrap from '../../wrapper/AppWrap';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import Circular from '../../components/Subcomponents/Circular';
import SingularSkeleton from '../../components/Subcomponents/SingularSkeleton';
import CardSkeleton from '../../components/Subcomponents/CardSkeleton';
import Card from '../../components/Card/Card';

import { requestGet, getImageUrl } from '../../utils/Request';

import './SingularFilme.scss';

function SingularFilme() {
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(true);
  const [film, setFilm] = useState({});
  const [similars, setSimilars] = useState([]);

  const { id } = useParams();
  const { backdrop_path: backdropPath, poster_path: posterPath } = film;

  useEffect(() => {
    async function getFilm() {
      setLoading(true);
      const response = await requestGet(`/movie/${id}`, { language: 'pt-BR' });
      setFilm(response);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    getFilm();
  }, [id]);

  useEffect(() => {
    async function getSimilarFilms() {
      setSimilarLoading(true);
      const response = await requestGet(`/movie/${id}/similar`, { language: 'pt-BR' });
      setSimilars(response.results);

      setTimeout(() => {
        setSimilarLoading(false);
      }, 500);
    }

    getSimilarFilms();
  }, [id]);

  const transformRuntimeInHours = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}min`;
  };

  const generateSkeletons = (qnt) => {
    const skeletons = [];
    for (let i = 0; i < qnt; i += 1) {
      skeletons.push(<CardSkeleton key={i} />);
    }
    return skeletons;
  };

  return (
    <div>
      {loading ? (
        <SingularSkeleton />
      ) : (
        <div className="app__singular-firstinfos" style={{ backgroundImage: `url(${getImageUrl(backdropPath, 'original')})` }}>
          <img src={getImageUrl(posterPath, 'w300')} alt="Capa do filme" />
          <div className="app__flex infos">
            <h1>{film.title}</h1>
            <div className="metas">
              <h3>{new Date(film.release_date).toLocaleDateString('pt-BR')}</h3>
              <div className="dot-spacer" />
              <div className="genre">
                {
                film.genres && film.genres.map((genre) => (
                  <h3 className="genre-tag" key={genre.id}>{genre.name}</h3>
                ))
              }
              </div>
              <div className="dot-spacer" />
              <h3>{transformRuntimeInHours(film.runtime)}</h3>
            </div>
            <div className="rates">
              <Circular value={film.vote_average * 10} />
              <div className="counts">
                <h4>Quantia de votos</h4>
                <h3>{film.vote_count}</h3>
              </div>
              <div className="counts">
                <h4>Popularidade</h4>
                <h3>{film.popularity}</h3>
              </div>
            </div>
            {film.overview && (
            <div className="overview">
              <h2>Sinopse</h2>
              <p>{film.overview}</p>
            </div>
            )}
            <div className="companies">
              <h2>Produtoras</h2>
              <div className="companies-list">
                <div className="companies-list-text">
                  {
                  film.production_companies && film.production_companies.map((company) => (
                    <div className="company" key={company.id}>
                      <h3>{company.name}</h3>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="app__singular-similars">
        {console.log(similarLoading)}
        {similarLoading ? (
          generateSkeletons(20)
        ) : (
          similars.map((similar) => (
            <Card
              key={similar.id}
              film={similar}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default AppWrap(SingularFilme, Header, Footer, 'app__wrapper');
