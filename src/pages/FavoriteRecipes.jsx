import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'food', 'drink'];
  return (
    <div className="page">
      <Header pageTitle="Favorite Recipes" showSearchButton={ false } />
      <section className="filter-section">
        {filters.map((option, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `filter-by-${option}-btn` }
            onClick={ () => setFilter(option) }
            className="done-filter-btn"
          >
            {option}
          </button>
        ))}
      </section>
      <CardFavorite filter={ filter } />
    </div>
  );
}

export default FavoriteRecipes;
