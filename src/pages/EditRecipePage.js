import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 

const API_URL = "http://localhost:5005";

function EditRecipePage(props) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  
  const { recipeId } = useParams();
  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);
  
  useEffect(() => {

    const storedToken = localStorage.getItem('authToken');
    axios
      .get(
        `${API_URL}/api/recipes/${recipeId}`,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then((response) => {
        const oneRecipe = response.data;
        setName(oneRecipe.name);
        setInstructions(oneRecipe.instructions);
      })
      .catch((error) => console.log(error));
    
  }, [recipeId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, instructions };

    const storedToken = localStorage.getItem('authToken');  

    axios
      .put(`${API_URL}/api/recipes/${recipeId}`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then((response) => {
        navigate(`/recipes/${recipeId}`)
      });
  };

  return (
    <div className={'EditRecipePage ' + theme}>
      <h2 id="editTitle">Edit the Recipe</h2>

      <form onSubmit={handleFormSubmit} className='EditRecipeForm' >
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <label>Instructions:</label>
        <textarea
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipePage;
