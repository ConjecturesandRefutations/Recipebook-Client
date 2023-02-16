import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import FeedbackList from "../components/FeedbackList";
import ClipLoader from "react-spinners/ClipLoader";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from './../context/auth.context'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";



function RecipeDetailsPage (props) {
  const [recipe, setRecipe] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  const { theme } = useContext(ThemeContext);
  
  const getRecipe = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        const oneRecipe = response.data;
        setLoading(false)
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(()=> {
    getRecipe();
  }, [] );

  function goBack(){ navigate(-1)}

  const deleteRecipe = () => {

    const storedToken = localStorage.getItem('authToken'); 
    
    axios
      .delete(`${API_URL}/api/recipes/${recipeId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } }  
      )
      .then(() => {
        
        goBack()
      })
      .catch((err) => console.log(err));
  };   

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
  },  [] );

  return (
    <div className={"RecipeDetails " + theme}>

{loading ? <ClipLoader color="#36d7b7" /> : null}

      {recipe && (
        <>
          <h1>{recipe.name}</h1>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{recipe.isVegetarian ? 'Vegetarian 🍃' : '' }</p>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{recipe.isVegan ? 'Vegan 🍃' : ''}</p>
          <p> <span style={{fontWeight: 'bold' }}>Ingredients: </span>{recipe.ingredients}</p>
          <p> <span style={{fontWeight: 'bold' }}>Instructions: </span>{recipe.instructions}</p>
          </>
        
      )}

{(myRecipes.map((recipe)=> recipe._id)).includes(recipeId) ? (
  <section className="editDelete-userOnly">
    <Link to={`/recipes/edit/${recipeId}`}>
      <button>Edit Recipe</button>
    </Link>
    <button onClick={deleteRecipe} id="deleteRecipe">
      Delete Recipe
    </button>
  </section>
) : null}


{!(myRecipes.map((recipe)=> recipe._id)).includes(recipeId) ? (
      <FeedbackList recipeId={recipeId} storedToken={localStorage.getItem('authToken')} userId={user._id}/>
      ) : null}
    </div>
  );
}

export default RecipeDetailsPage;
