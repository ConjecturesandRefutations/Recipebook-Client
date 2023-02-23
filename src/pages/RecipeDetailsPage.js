import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from "axios";
import FeedbackList from "../components/FeedbackList";
import ClipLoader from "react-spinners/ClipLoader";

import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from './../context/auth.context'

import defaultProfile from '../images/defaultProfile.jpg';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";



function RecipeDetailsPage (props) {
  const [recipe, setRecipe] = useState(null);
  const [myRecipes, setMyRecipes] = useState([]);
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [creatorName, setCreatorName] = useState('');
  const [creatorImage, setCreatorImage] = useState('');

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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

///The following route determine the user who created the the given recipe

   const getRecipeUser = () => {
    const storedToken = localStorage.getItem('authToken');
    axios
      .get(`${API_URL}/api/recipes/${recipeId}/user`, {
        headers: { Authorization: `Bearer ${storedToken}` }
      })
      .then((response) => {
        const creator = response.data;
        setCreatorName(creator.name);
        setCreatorImage(creator.image)
      })
      .catch((error) => console.log(error));
  };
  
  useEffect(() => {
    getRecipeUser();
  },  [] );


  return (
    <div className={"RecipeDetails " + theme}>

{console.log(creatorImage)}

{loading ? <ClipLoader color="#36d7b7" /> : null}

      {recipe && (
        <>
             <div className="creatorName"><span>Recipe Created By: </span><span style={{fontWeight:'bold'}} id='creator'>{creatorName}</span>
             <img alt="creator-image" src={creatorImage ? creatorImage : defaultProfile} id='creatorImage'/>
             </div>

          <h1>{recipe.name}</h1>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{recipe.isVegetarian ? 'Vegetarian 🍃' : '' }</p>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{recipe.isVegan ? 'Vegan 🍃' : ''}</p>
          <div className="recipeDetails">
          <p> <span style={{fontWeight: 'bold' }}>Ingredients: </span>{recipe.ingredients}</p>
          <p> <span style={{fontWeight: 'bold' }}>Instructions: </span>{recipe.instructions}</p>
          </div>
          </>
        
      )}

{(myRecipes.map((recipe)=> recipe._id)).includes(recipeId) ? (
  <section className="editDelete-userOnly">
    <Link to={`/recipes/edit/${recipeId}`}>
      <button style={{background:'orange'}}>Edit Recipe</button>
    </Link>
    <button onClick={deleteRecipe} id="deleteRecipe">
      Delete Recipe
    </button>
  </section>
) : null}



<button onClick={()=>goBack()}>
      Back
    </button>

      <FeedbackList recipeId={recipeId} storedToken={localStorage.getItem('authToken')} userId={user._id}/>
 
    </div>
  );
}

export default RecipeDetailsPage;
