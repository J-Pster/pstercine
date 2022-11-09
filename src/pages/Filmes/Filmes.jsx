import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Header, Footer } from '../../components';
import AppWrap from '../../wrapper/AppWrap';
import Card from '../../components/Card/Card';
import Skeleton from '../../components/Subcomponents/Skeleton';

import { requestGet } from '../../utils/Request';

import './Filmes.scss';

function Filmes() {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getFilms() {
      setLoading(true);
      const response = await requestGet('/movie/popular', { language: 'pt-BR', page });
      setFilms(response.results);

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }

    getFilms();
  }, []);

  async function loadMore() {
    const response = await requestGet('/movie/popular', { language: 'pt-BR', page: page + 1 });
    setFilms([...films, ...response.results]);
    setPage(page + 1);
  }

  const hasMore = () => {
    if (page > 499) {
      return false;
    }
    return true;
  };

  const generateSkeletons = (qnt) => {
    const skeletons = [];
    for (let i = 0; i < qnt; i += 1) {
      skeletons.push(<Skeleton key={i} />);
    }
    return skeletons;
  };

  return (
    <InfiniteScroll
      className="app__films"
      pageStart={1}
      loadMore={() => loadMore()}
      hasMore={hasMore()}
      loader={<div className="loader" key={0}>Loading ...</div>}
      initialLoad={false}
    >
      {loading ? (
        generateSkeletons(20)
      ) : (
        films.map((film) => (
          <Card
            key={film.id}
            film={film}
          />
        ))
      )}
    </InfiniteScroll>
  );
}

export default AppWrap(Filmes, Header, Footer);
