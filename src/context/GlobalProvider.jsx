/* eslint-disable no-console */
import React, {
  useMemo, useState, useEffect, createContext,
} from 'react';
import PropTypes from 'prop-types';

// import usePersistedState from '../hooks/usePersistentState';
import { setHeaderToken } from '../utils/Request';

export const HomeerContext = createContext();

export function GlobalProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(true);
  const [loading, setLoading] = useState(true);

  const memorizedContext = useMemo(() => ({
    loading: {
      loading,
      setLoading,
    },
    auth: {
      isSignedIn,
      setIsSignedIn,
    },
  }), [isSignedIn]);

  useEffect(() => {
    try {
      setHeaderToken(process.env.REACT_APP_API_V4_KEY);
      console.log('Bearer definido com sucesso!');
    } catch (err) {
      console.log('Erro ao definir Bearer!', err);
    }
  }, []);

  return (
    <HomeerContext.Provider value={memorizedContext}>
      {children}
    </HomeerContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
