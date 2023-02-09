import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from "axios";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 

const API_URL = "http://localhost:5005";

function EditRecipePage(props) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [courseType, setCourseType] = useState("");
  const courseTypes = ["Starter", "Main", "Dessert","Snack", "Other"] 
  
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
        setIsVegetarian(oneRecipe.isVegetarian);
        setIsVegan(oneRecipe.isVegan);
        setCourseType(oneRecipe.courseType);
      })
      .catch((error) => console.log(error));
    
  }, [recipeId]);
  

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { name, instructions, isVegetarian, isVegan, courseType };

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

<section className="selectCourseType">
<label>Course Type:</label>
<select value={courseType} onChange={(e) => setCourseType(e.target.value)}>
  {courseTypes.map((courseTypeOption, index) => (
    <option key={index} value={courseTypeOption}>{courseTypeOption}</option>
  ))}
</select>
</section>

<section className="checkboxEdit">
<div>
<input
    type="checkbox"
    checked={isVegetarian}
    onChange={(e) => setIsVegetarian(e.target.checked)}
    name="isVegetarian"
  />

    <label>Vegetarian</label>
  </div>
  <div>
  <input
    type="checkbox"
    checked={isVegan}
    onChange={(e) => setIsVegan(e.target.checked)}
    name="isVegan"
  />
    <label>Vegan</label>
  </div>
  </section>

        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
}

export default EditRecipePage;
