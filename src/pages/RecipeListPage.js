import { useState, useEffect } from "react";
import axios from "axios";
import { Row } from 'antd';

import RecipeCard from "../components/RecipeCard";
import AddRecipe from "../components/AddRecipe";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context';

const API_URL = "http://localhost:5005";

function RecipeListPage() {
  const [recipes, setRecipes] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)

  const { theme } = useContext(ThemeContext);

  const getAllRecipes = () => {
    
    axios
      .get(`${API_URL}/api/recipes`)
      .then((response) => setRecipes(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllRecipes();
  }, [] );

  
  return (
    
    <div className={"RecipeListPage " + theme}>
      
      <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggle'>{displayForm ? 'Hide Add Recipe Form' : 'Click to Add Recipe'}</button>
      {displayForm && <AddRecipe refreshRecipes={getAllRecipes} />}
      
      
      <Row style={{ width: '100%', justifyContent: 'center' }}>
      { recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>
       
    </div>
  );
}

export default RecipeListPage;

