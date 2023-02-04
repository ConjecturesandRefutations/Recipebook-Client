import { useState, useEffect } from "react";
import axios from "axios";
import { Row } from 'antd';

import RecipeCard from "../components/RecipeCard";
import AddRecipe from "../components/AddRecipe";
import SearchBar from "../components/Search";

import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context';

const API_URL = "http://localhost:5005";

function RecipeListPage() {
  let [recipes, setRecipes] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)
  const [query, setQuery] = useState('');

  const { theme } = useContext(ThemeContext);

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
  }, [] );


  recipes = recipes.filter((recipe) => {
  return recipe.name.toLowerCase().includes(query.toLowerCase());
  });

  
  return (
    
    <div className={"RecipeListPage " + theme}>
      
      <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggle'>{displayForm ? 'Hide Add Recipe Form' : 'Click to Add Recipe'}</button>
      {displayForm && <AddRecipe refreshRecipes={getAllRecipes} />}
      
      <SearchBar setQueryProp={setQuery}/>
      
      <Row style={{ width: '100%', justifyContent: 'center' }}>
      { recipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>
       
    </div>
  );
}

export default RecipeListPage;

