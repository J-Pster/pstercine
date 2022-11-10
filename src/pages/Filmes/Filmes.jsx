import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';

import { Header, Footer } from '../../components';
import AppWrap from '../../wrapper/AppWrap';
import Card from '../../components/Card/Card';
import Skeleton from '../../components/Subcomponents/CardSkeleton';

import { requestGet } from '../../utils/Request';

import './Filmes.scss';

function Filmes() {
  const [films, setFilms] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [endpoint, setEndpoint] = useState('/movie/popular');
  const [params, setParams] = useState({ language: 'pt-BR', page });

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const getFilms = async (curEndpoint, curParams, reset = false) => {
    setLoading(true);

    setEndpoint(curEndpoint);
    setParams(curParams);

    const response = await requestGet(curEndpoint, curParams);
    if(response.results.length === 0) setHasMore(false);
    reset ? setFilms(response.results) : setFilms([...films, ...response.results]);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getFilms('/movie/popular', { language: 'pt-BR', page });
  }, []);

  useEffect(() => {
    console.log(searchParams.get('search'));
    if(searchParams.get('search')) getFilms('/search/movie', { language: 'pt-BR', page, query: searchParams.get('search') }, true);
    if(!searchParams.get('search')) getFilms('/movie/popular', { language: 'pt-BR', page }, true);
  }, [searchParams.get('search')]);

  const loadMore = async () => {
    const curParam = { ...params, page: page + 1 };

    const response = await requestGet(endpoint, curParam);
    if(response.results.length === 0) setHasMore(false);

    setFilms([...films, ...response.results]);

    setPage(page + 1);
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
      hasMore={hasMore}
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
