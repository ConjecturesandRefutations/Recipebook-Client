import { useState, useEffect } from "react";
import axios from "axios";
import { Row } from 'antd';

import RecipeCard from "../components/RecipeCard";
import AddRecipe from "../components/AddRecipe";

const API_URL = "http://localhost:5005";

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);

  const getAllRecipes = () => {
    axios
      .get(`${API_URL}/api/recipes`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllRecipes();
  }, [] );

  
  return (
    <div className="RecipeListPage">
      
      <AddRecipe refreshRecipes={getAllRecipes} />
      
      <Row style={{ width: '100%', justifyContent: 'center' }}>
      { recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>
       
    </div>
  );
}

export default RecipeListPage;

