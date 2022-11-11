import React, { useEffect, useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import debouce from "lodash.debounce";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import Badge from '@mui/material/Badge';
import { IoIosNotificationsOutline, IoIosSearch } from 'react-icons/io';

import Images from '../../constants/images';
import NightMode from '../Subcomponents/NightMode';
import { Search, SearchIconWrapper, StyledInputBase } from '../Subcomponents/Search';

import './Header.scss';

const name = 'João Pster';

function Header() {
  const [page, setPage] = React.useState('Populares');

  const navigate = useNavigate();

  const handlePage = (_event, newPage) => {
    if (newPage !== null) {
      setPage(newPage);
    }
  };

  const handleSearch = (e) => {
    if(e.target.value.length) navigate(`/filmes?search=${e.target.value}`);
    if(e.target.value.length === 0) navigate(`/filmes`);
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <div className="app__flex app__header">
      <div className="app__flex app__header__controls">
        <Search className='search_box'>
          <SearchIconWrapper>
            <IoIosSearch className='search-icon' />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Pesquisar..."
            inputProps={{ 'aria-label': 'search' }}
            onChange={debouncedResults}
          />
        </Search>
        <ToggleButtonGroup
          color="primary"
          value={page}
          exclusive
          onChange={handlePage}
          aria-label="page"
          classes={{ root: 'app__header__controls__buttons' }}
        >
          <ToggleButton onClick={() => navigate('/filmes')} classes={{ root: 'buttons', selected: 'selected' }} value="Populares" aria-label="populares"> Populares </ToggleButton>
          <ToggleButton classes={{ root: 'buttons', selected: 'selected' }} value="Em Alta" aria-label="em alta"> Em Alta </ToggleButton>
          <ToggleButton classes={{ root: 'buttons', selected: 'selected' }} value="Novos" aria-label="novos"> Novos </ToggleButton>
          <ToggleButton classes={{ root: 'buttons', selected: 'selected' }} value="Nos Cinemas" aria-label="nos cinemas"> Nos Cinemas </ToggleButton>
        </ToggleButtonGroup>
        <NightMode className='night-mode' />
      </div>
      <div className="app__flex app__header-user">
        <Badge color="primary" badgeContent={1} classes={{ root: 'app__header-notification' }}>
          <IoIosNotificationsOutline color="white" />
        </Badge>
        <div className="app__flex app__header-profile">
          <Avatar className="app__header-profile-img" alt={name} src={Images.Profile} />
          <h4>{name}</h4>
        </div>
      </div>
    </div>
  );
}

export default Header;
