import React, { useState } from 'react';
import Header from '../components/Header';
// import DoneFoodsCard from '../components/DoneFoodsCard';
import DoneRecipeCard from '../components/DoneRecipeCard';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'food', 'drink'];

  return (
    <div className="page">
      <Header pageTitle="Done Recipes" showSearchButton={ false } />
      <section className="filter-section">
        {filters.map((option, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `filter-by-${option}-btn` }
            onClick={ () => setFilter(option) }
          >
            {option}
          </button>
        ))}
      </section>
      <DoneRecipeCard filter={ filter } />
      <p>pagina</p>
    </div>
  );
}

export default DoneRecipes;
