import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditRecipePage(props) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  
  const { recipeId } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    axios
      .get(`${API_URL}/api/recipes/${recipeId}`)
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

    axios
      .put(`${API_URL}/api/recipes/${recipeId}`, requestBody)
      .then((response) => {
        navigate(`/recipes/${recipeId}`)
      });
  };
  
  
  const deleteRecipe = () => {
    
    axios
      .delete(`${API_URL}/api/recipes/${recipeId}`)
      .then(() => {
        navigate("/recipes");
      })
      .catch((err) => console.log(err));
  };  

  
  return (
    <div className="EditRecipePage">
      <h3>Edit the Recipe</h3>

      <form onSubmit={handleFormSubmit}>
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

      <button onClick={deleteRecipe}>Delete Recipe</button>
    </div>
  );
}

export default EditRecipePage;
