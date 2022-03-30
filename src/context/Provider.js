import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [user, setUser] = useState({ email: '' });
  const [recipes, setRecipes] = useState([]);
  const [showFilteredRecipes, setShowFilteredRecipes] = useState(false);
  const contextValue = {
    user,
    setUser,
    recipes,
    setRecipes,
    showFilteredRecipes,
    setShowFilteredRecipes,
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
