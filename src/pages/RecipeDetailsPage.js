import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";


function RecipeDetailsPage (props) {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  
  const getRecipe = () => {
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`)
      .then((response) => {
      	const oneRecipe = response.data;
      	setRecipe(oneRecipe);
    	})
      .catch((error) => console.log(error));
  };
  
  
  useEffect(()=> {
    getRecipe();
  }, [] );

  
  return (
    <div className="RecipeDetails">
    
      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <p>{recipe.instructions}</p>
        </>
      )}

      <Link to="/recipes">
        <button>Back to Recipes</button>
      </Link>
          
      <Link to={`/recipes/edit/${recipeId}`}>
        <button>Edit Recipe</button>
      </Link>
      
    </div>
  );
}

export default RecipeDetailsPage;