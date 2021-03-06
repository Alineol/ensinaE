import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PropTypes from 'prop-types';
import DrinkSuggestion from '../components/DrinkSuggestion';
import Recipe from '../components/Recipe';
import context from '../context/context';

function FoodDetails(props) {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { setProgress } = useContext(context);

  const adaptToRecipe = (data) => {
    if (!data.meals) {
      return;
    }

    const singleRecipe = data.meals[0];
    const { strMeal,
      strMealThumb, strCategory, strInstructions,
      strArea, strTags, strYoutube } = data.meals[0];
    const video = strYoutube.replace('watch?v=', 'embed/');

    const ingredients = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strIngredient') && value);

    const measures = Object
      .entries(singleRecipe)
      .filter(([key, value]) => key.includes('strMeasure') && value);

    const ingredientsWithMeasures = ingredients.map((ingredient, index) => {
      if (measures[index]) {
        return `${ingredient[1]} ${measures[index][1]}`;
      }
      return ingredient[1];
    });

    setRecipe({
      name: strMeal,
      image: strMealThumb,
      category: strCategory,
      ingredients: ingredientsWithMeasures,
      instructions: strInstructions,
      alcoholicOrNot: '',
      nationality: strArea,
      id,
      type: 'food',
      video,
      tags: strTags,
    });
  };

  useEffect(() => {
    const fetchRecipeApi = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      const data = await response.json();
      adaptToRecipe(data);
    };

    fetchRecipeApi();
  }, [id]);

  const checkMealInProgress = () => {
    const checkMeals = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (checkMeals) {
      const isMealOnLocalStorage = Object.keys(checkMeals.meals)
        .some((keys) => keys === id);
      return isMealOnLocalStorage;
    }
  };

  return (
    recipe && (
      <div className="page">
        <section className="recipe-section">
          <Recipe
            recipe={ recipe }
            viewMode="details"
          />
        </section>
        <iframe
          title="teste"
          width="450"
          height="350"
          src={ recipe.video }
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay;
           clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          data-testid="video"
          className="details-video"
        />
        <section className="sugestions-section">
          <DrinkSuggestion numberOfSuggestions={ 6 } />
        </section>
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => {
            const { history } = props;
            setProgress([]);
            history.push(`/foods/${id}/in-progress`);
          } }
        >
          { checkMealInProgress()
            ? 'Continue Recipe'
            : 'Start Recipe' }
        </button>
      </div>
    )
  );
}

FoodDetails.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default FoodDetails;
