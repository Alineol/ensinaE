import React from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const contextValue = {
  };

  return (
    <context.Provider value={ contextValue }>
      {children}
    </context.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
