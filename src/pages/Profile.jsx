import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MenuInferior from '../components/MenuInferior';

function Profile(props) {
  const [email, setEmail] = useState('');

  const { history } = props;
  useEffect(() => {
    const savedEmail = JSON.parse(localStorage.getItem('user'));
    if (savedEmail) {
      setEmail(savedEmail.email);
    }
  }, []);

  return (
    <div>
      <Header pageTitle="Profile" showSearchButton={ false } />
      <div>
        <p data-testid="profile-email">{email}</p>
      </div>
      <div className="main-profile">
        <div>
          <button
            data-testid="profile-done-btn"
            className="menu-btn"
            type="button"
            onClick={ () => history.push('/done-recipes') }
          >
            Done Recipes
          </button>
          <button
            data-testid="profile-favorite-btn"
            type="button"
            className="menu-btn"
            onClick={ () => history.push('/favorite-recipes') }
          >
            Favorite Recipes
          </button>
        </div>
        <div>
          <button
            data-testid="profile-logout-btn"
            className="logout-btn"
            type="button"
            onClick={ () => { localStorage.clear(); history.push('/'); } }
          >
            Logout
          </button>
        </div>
      </div>
      <MenuInferior />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Profile;
