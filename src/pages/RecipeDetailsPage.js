import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import FeedbackList from "../components/FeedbackList";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from './../context/auth.context'

const API_URL = "http://localhost:5005";


function RecipeDetailsPage (props) {
  const [recipe, setRecipe] = useState(null);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const { theme } = useContext(ThemeContext);
  
  const getRecipe = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
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

    const storedToken = localStorage.getItem('authToken'); 
    
    axios
      .delete(`${API_URL}/api/recipes/${recipeId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }  
      )
      .then(() => {
        navigate("/recipes");
      })
      .catch((err) => console.log(err));
  };   
  
  return (
    <div className={"RecipeDetails " + theme}>
      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{recipe.isVegetarian ? 'Vegetarian 🍃' : '' }</p>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{recipe.isVegan ? 'Vegan 🍃' : ''}</p>
          <p>{recipe.instructions}</p>
          <p>{recipeId}</p>
          <p>{user._id}</p>
          <p>{user.recipe}</p>
          {console.log('RRR' + recipe.user)}
        </>
      )}
  
  {user && recipe && `${recipe.user}` === `${user._id}` && (
  <section className="editDelete-userOnly">
    <Link to={`/recipes/edit/${recipeId}`}>
      <button>Edit Recipe</button>
    </Link>
    <button onClick={deleteRecipe} id="deleteRecipe">
      Delete Recipe
    </button>
  </section>
)}
  
      <FeedbackList recipeId={recipeId} storedToken={localStorage.getItem('authToken')} />
    </div>
  );
  

}

export default RecipeDetailsPage;