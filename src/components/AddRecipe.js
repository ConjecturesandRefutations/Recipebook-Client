import { useState } from "react";
import axios from "axios";
import { Input } from 'antd';

const API_URL = "http://localhost:5005";

function AddRecipe(props) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, instructions };
    
    axios
      .post(`${API_URL}/api/recipes`, requestBody)
      .then((response) => {
        // Reset the state
        setName("");
        setInstructions("");
        props.refreshRecipes();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddRecipe">
      <h3>Add Recipe</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Instructions:</label>
        <textarea
          type="text"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <button type="submit" id="submitRecipe">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;