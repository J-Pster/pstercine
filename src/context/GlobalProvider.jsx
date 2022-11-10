import React, {
  useMemo, useState, useEffect, createContext,
} from 'react';
import PropTypes from 'prop-types';

import { setHeaderToken } from '../utils/Request';

export const PsterCineContext = createContext();

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
      // eslint-disable-next-line no-undef
      setHeaderToken(process.env.REACT_APP_API_V4_KEY);
    } catch (err) {
      console.error('Erro ao definir Bearer!', err);
    }
  }, []);

  return (
    <PsterCineContext.Provider value={memorizedContext}>
      {children}
    </PsterCineContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
