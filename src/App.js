import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import Login from './pages/Login';
import RecipesScreen from './pages/RecipesScreen';
import FoodDetails from './pages/FoodDetails';
import FoodInProgress from './pages/FoodInProgress';
// import Drinks from './pages/Drinks';
import DrinkDetails from './pages/DrinkDetails';
import DrinkInProgress from './pages/DrinkInProgress';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinksByIngredient from './pages/ExploreDrinksByIngredient';
import ExploreFoodsByIngredient from './pages/ExploreFoodsByIngredient';
import ExploreFoodsByNationality from './pages/ExploreFoodsByNationality';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import NotFoundPage from './pages/NotFoundPage';
// import Foods from './pages/Foods';

function App() {
  return (
    <BrowserRouter basename={ process.env.PUBLIC_URL }>
      <Provider>
        <Switch>
          <Route exact path="/" render={ (props) => <Login { ...props } /> } />
          <Route
            exact
            path="/foods"
            render={ (props) => <RecipesScreen { ...props } /> }
          />
          <Route
            exact
            path="/drinks"
            render={ (props) => <RecipesScreen { ...props } /> }
          />
          <Route exact path="/foods/:id" component={ FoodDetails } />
          <Route exact path="/drinks/:id" component={ DrinkDetails } />
          <Route
            exact
            path="/foods/:id/in-progress"
            component={ FoodInProgress }
          />
          <Route
            exact
            path="/drinks/:id/in-progress"
            component={ DrinkInProgress }
          />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreFoodsByIngredient }
          />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreDrinksByIngredient }
          />
          <Route
            exact
            path="/explore/foods/nationalities"
            component={ ExploreFoodsByNationality }
          />
          <Route path="/profile" component={ Profile } />
          <Route path="/done-recipes" component={ DoneRecipes } />
          <Route path="/favorite-recipes" component={ FavoriteRecipes } />
          <Route
            component={ NotFoundPage }
          />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
