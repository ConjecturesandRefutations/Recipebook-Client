import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from './../context/auth.context'
import { ThemeContext } from './../context/theme.context'; 

const API_URL = "http://localhost:5005";

const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [myRecipes, setMyRecipes] = useState([]);

const getMyRecipes = () => {
  const storedToken = localStorage.getItem("authToken");

  axios
.get(`${API_URL}/api/recipes/user/${user._id}`,
{ headers: { Authorization: `Bearer ${storedToken}` } })
.then((response) => {
  setMyRecipes(response.data);
  })
    .catch((error) => console.log(error));
};

useEffect(() => {
  getMyRecipes();
}, [] );

return (
  <div className={'myRecipes ' + theme}>
 
   
    <h1>My Recipes</h1>
    {myRecipes.map((recipe) => (
      <div key={recipe._id}>
        <h2>{recipe.name}</h2>
        <p>{recipe.instructions}</p>
      </div>
    ))}
  </div>
);
};

export default ProfilePage;