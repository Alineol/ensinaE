import React, { useContext, useEffect } from 'react';
import context from '../context/context';

function FoodsCards() {
  const { recipes, setRecipes, showFilteredRecipes } = useContext(context);
  useEffect(() => {
    const maxIndex = 12;
    const fetchFoodsApi = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      const twelveRecipes = data.meals.slice(0, maxIndex);
      setRecipes(twelveRecipes);
    };
    if (showFilteredRecipes === false) {
      fetchFoodsApi();
    }
  }, [setRecipes, showFilteredRecipes]);

  if (recipes[0] !== undefined) {
    return (
      <section className="recipes-section">
        {recipes.map((recipe, index) => (
          <div key={ recipe.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
              width="100px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>
              {recipe.strMeal}
              {' '}
            </p>
          </div>
        ))}
      </section>
    );
  }
  return (
    <p>Carregando...</p>
  );
}

export default FoodsCards;
