import { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 



const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";


function RandomRecipe() {
    const { theme } = useContext(ThemeContext);
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshPage = ()=>{
      window.location.reload();
   }
 
  
    const getAllRecipes = () => {

      const storedToken = localStorage.getItem("authToken");
      
      axios
      .get(`${API_URL}/api/recipes`,
      { headers: { Authorization: `Bearer ${storedToken}` } })
      .then(setLoading(false))
      .then((response) => setRecipes(response.data) )
      .catch((error) => console.log(error));
    };

    useEffect(() => {
      getAllRecipes();

    },  [] )

    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)]
    console.log(randomRecipe)
    

return(
<div className={'randomRecipe ' + theme}>

{loading ? <ClipLoader color="#36d7b7"/> : null}

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