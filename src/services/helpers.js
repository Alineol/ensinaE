import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export function isNotArrayEmpty(arr) {
  return Array.isArray(arr) && arr.length;
}

export const createInProgressStorage = () => {
  if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
};

const SaveFoodInLocal = (ingredient, recipeId) => {
  const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (saved) {
    const drinks = saved.cocktails;
    const findId = Object.keys(saved.meals).some((id) => id === recipeId);
    if (!findId && ingredient.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...drinks },
        meals: { ...saved.meals, [recipeId]: [ingredient] },
      }));
    }
    if (findId && ingredient.length > 0) {
      const checkIngredient = saved.meals[recipeId].some((item) => item === ingredient);
      if (checkIngredient) {
        const newIngredientsList = saved.meals[recipeId]
          .filter((item) => item !== ingredient);
        saved.meals[recipeId] = newIngredientsList;
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { ...drinks },
          meals: { ...saved.meals },
        }));
      } else {
        const newIngredientsList = saved.meals[recipeId].concat(ingredient);
        saved.meals[recipeId] = newIngredientsList;
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { ...drinks },
          meals: { ...saved.meals },
        }));
      }
    }
  }
};

const SaveDrinksinLocal = (ingredient, recipeId) => {
  const saved = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (saved) {
    const foods = saved.meals;
    const findId = Object.keys(saved.cocktails).some((id) => id === recipeId);
    if (!findId && ingredient.length > 0) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: { ...saved.cocktails, [recipeId]: [ingredient] },
        meals: { ...foods },
      }));
    }
    if (findId && ingredient.length > 0) {
      const checkIngredient = saved.cocktails[recipeId]
        .some((item) => item === ingredient);
      if (checkIngredient) {
        const newIngredientsList = saved.cocktails[recipeId]
          .filter((item) => item !== ingredient);
        saved.cocktails[recipeId] = newIngredientsList;
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { ...saved.cocktails },
          meals: { ...foods },
        }));
      } else {
        const newIngredientsList = saved.cocktails[recipeId].concat(ingredient);
        saved.cocktails[recipeId] = newIngredientsList;
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          cocktails: { ...saved.cocktails },
          meals: { ...foods },
        }));
      }
    }
  }
};

export const SaveProgressinLocalSotorage = (ingredient, recipeId, type) => {
  if (type === 'food') {
    SaveFoodInLocal(ingredient, recipeId);
  }
  if (type === 'drink') {
    SaveDrinksinLocal(ingredient, recipeId);
  }
};

export function checkCheked(pathname, name, id) {
  if (pathname.includes('foods')) {
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes')).meals;
    const findId = Object.keys(saved).some((key) => key === id);
    if (findId) {
      const hasIngredient = saved[id].some((ingredient) => ingredient === name);
      if (hasIngredient) {
        return true;
      } return false;
    }
  } if (pathname.includes('drinks')) {
    const saved = JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails;
    const findId = Object.keys(saved).some((key) => key === id);
    if (findId) {
      const hasIngredient = saved[id].some((ingredient) => ingredient === name);
      if (hasIngredient) {
        return true;
      } return false;
    }
  }
}

export const SaveFavoriteRecipe = ({
  id, type, nationality, category, alcoholicOrNot, name, image }) => {
  const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!savedFavorites) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    }]));
  }
  if (savedFavorites) {
    console.log(savedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...savedFavorites, {
      id,
      type,
      nationality,
      category,
      alcoholicOrNot,
      name,
      image,
    }]));
  }
};

export const checkFavorite = ({ id }) => {
  const savedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
  if (!savedFavorites) {
    return whiteHeart;
  }
  if (savedFavorites) {
    const isFavorite = savedFavorites.some((recipe) => recipe.id === id);
    if (isFavorite) {
      return blackHeart;
    } return whiteHeart;
  }
};
