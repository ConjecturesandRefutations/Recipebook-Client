import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from 'antd';

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from './../context/auth.context'
/* import { Link } from 'react-router-dom'; */


const API_URL = "http://localhost:5005";

function RandomRecipe() {
    const { theme } = useContext(ThemeContext);
    const [recipes, setRecipes] = useState([]);
    const { user } = useContext(AuthContext);

    const refreshPage = ()=>{
      window.location.reload();
   }
 
  
    const getAllRecipes = () => {

      const storedToken = localStorage.getItem("authToken");
      
      axios
        .get(`${API_URL}/api/recipes`,
        { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => setRecipes(response.data))
        .catch((error) => console.log(error));
    };
  
    useEffect(() => {
      getAllRecipes();

    },  [] )

    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    console.log(randomRecipe)
    

return(
<div className={'randomRecipe ' + theme}>

{randomRecipe && (
        <>
          <h1>{randomRecipe.name}</h1>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{randomRecipe.isVegetarian ? 'Vegetarian 🍃' : '' }</p>
          <p style={{ color: 'green', fontWeight: 'bold' }}>{randomRecipe.isVegan ? 'Vegan 🍃' : ''}</p>
          <p> <span style={{fontWeight: 'bold' }}>Ingredients: </span>{randomRecipe.ingredients}</p>
          <p> <span style={{fontWeight: 'bold' }}>Instructions: </span>{randomRecipe.instructions}</p>
          </>
        
      )}

<button onClick={refreshPage}>Try Again?</button>

</div>
)
}

export default RandomRecipe;