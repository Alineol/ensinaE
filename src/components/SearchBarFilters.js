import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import context from '../context/context';
import {
  getFoodsByIngredientApi,
  getFoodsByNameApi,
  getFoodsByFirstLetterApi,
  getDrinksByIngredientApi,
  getDrinksByNameApi,
  getDrinksByFirstLetterApi } from '../services/fetchApiSearchBar';

export default function SearchBarFilters(props) {
  const { recipesFiltered, setRecipesFiltered } = useContext(context);
  const { pathname } = props;

  const [filters, setFilters] = useState({
    searchInputText: '',
    ingredientFilterType: false,
    nameFilterType: false,
    firstLetterFilterType: false,
  });

  const setFilter = (filter, value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [filter]: value,
    }));
  };

  const handleInputTextChange = ({ target }) => {
    const { name, value } = target;
    setFilter(name, value);
  };
  const handleRadioChange = ({ target: { name, checked } }) => setFilter(name, checked);

  const validateFields = (searchInputText,
    ingredientFilterType,
    firstLetterFilterType,
    nameFilterType) => {
    if (searchInputText === undefined || searchInputText === '') {
      global.alert('Informe pelo menos uma letra!');
      return false;
    }
    if (ingredientFilterType || nameFilterType || firstLetterFilterType) {
      return true;
    }
    if (firstLetterFilterType && searchInputText.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      return false;
    }
    return true;
  };

  const getRecipesByIngredient = async (textFilter) => {
    if (pathname === '/foods') {
      const foods = await getFoodsByIngredientApi(textFilter);
      return foods;
    }
    if (pathname === '/drinks') {
      const drinks = await getDrinksByIngredientApi(textFilter);
      return drinks;
    }
  };

  const getRecipesByName = async (textFilter) => {
    if (pathname === '/foods') {
      const foods = await getFoodsByNameApi(textFilter);
      return foods;
    }
    if (pathname === '/drinks') {
      const drinks = await getDrinksByNameApi(textFilter);
      return drinks;
    }
  };

  const getRecipesByFirstLetter = async (textFilter) => {
    if (pathname === '/foods') {
      const foods = await getFoodsByFirstLetterApi(textFilter);
      return foods;
    }
    if (pathname === '/drinks') {
      const drinks = await getDrinksByFirstLetterApi(textFilter);
      return drinks;
    }
  };

  const handleClickButton = () => {
    const {
      searchInputText,
      ingredientFilterType,
      nameFilterType,
      firstLetterFilterType } = filters;
    if (validateFields(searchInputText, ingredientFilterType,
      nameFilterType, firstLetterFilterType)) {
      if (ingredientFilterType) {
        setRecipesFiltered(getRecipesByIngredient(searchInputText));
      }
      if (nameFilterType) {
        setRecipesFiltered(getRecipesByName(searchInputText));
      }
      if (firstLetterFilterType) {
        setRecipesFiltered(getRecipesByFirstLetter(searchInputText));
      }
    }
    return recipesFiltered;
  };

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="searchInputText"
        value={ filters.searchInputText }
        onChange={ handleInputTextChange }
      />
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        name="ingredientFilterType"
        checked={ filters.ingredientFilterType }
        onChange={ handleRadioChange }
      />
      Ingredient
      <input
        data-testid="name-search-radio"
        type="radio"
        name="nameFilterType"
        checked={ filters.nameFilterType }
        onChange={ handleRadioChange }
      />
      Name
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        name="firstLetterFilterType"
        checked={ filters.firstLetterFilterType }
        onChange={ handleRadioChange }
      />
      First Letter
      <button
        data-testid="exec-search-btn"
        type="button"
        name="search-button"
        onClick={ handleClickButton }
      >
        Search
      </button>
    </div>
  );
}

SearchBarFilters.propTypes = {
  pathname: PropTypes.string.isRequired,
};
