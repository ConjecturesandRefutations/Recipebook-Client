import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5005";

const ProfilePage = (props) => {
    const userId = props.userId || localStorage.getItem("userId");
    const [myRecipes, setMyRecipes] = useState([]);

  const getMyRecipes = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
  .get(`${API_URL}/api/recipes/${userId}`,
  { headers: { Authorization: `Bearer ${storedToken}` } })
  .then((response) => {
    console.log('the response' + response);
    setMyRecipes(response.data);
    })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getMyRecipes();
  }, [] );

  return (
    <div>
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