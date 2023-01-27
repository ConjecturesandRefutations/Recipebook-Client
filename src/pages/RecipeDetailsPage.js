import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";


function RecipeDetailsPage (props) {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  
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

  const deleteRecipe = () => {
    
    axios
      .delete(`${API_URL}/api/recipes/${recipeId}`)
      .then(() => {
        navigate("/recipes");
      })
      .catch((err) => console.log(err));
  }; 
  
  return (
    <div className="RecipeDetails">
    
      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <p>{recipe.instructions}</p>
        </>
      )}

      <Link to={`/recipes/edit/${recipeId}`}>
        <button>Edit Recipe</button>
      </Link>

      <button onClick={deleteRecipe} id='deleteRecipe'>Delete Recipe</button>
      
    </div>
  );
}

export default RecipeDetailsPage;