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
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);


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

  const filteredRecipes = recipes.filter((recipe) => {
    return recipe.name.toLowerCase().includes(query.toLowerCase())
      && (!isVegetarian || recipe.isVegetarian || recipe.isVegan)
      && (!isVegan || recipe.isVegan);
  });
  
  return (
    
    <div className={"RecipeListPage " + theme}>
      
            <h2 className="allUsers">All Users' Recipes</h2>

      <button onClick={()=> setDisplayForm(!displayForm)} className='showFormToggle'>{displayForm ? 'Hide Add Recipe Form' : 'Click to Add Recipe'}</button>
      {displayForm && <AddRecipe refreshRecipes={getAllRecipes} />}
      
      <SearchBar setQueryProp={setQuery}/>

      <section className="veggieCheckboxes">

      <label>
        Vegetarian:
        <input
          type="checkbox"
          checked={isVegetarian}
          onChange={(event) => setIsVegetarian(event.target.checked)}
        />
      </label>
      
      <label>
        Vegan:
        <input
          type="checkbox"
          checked={isVegan}
          onChange={(event) => setIsVegan(event.target.checked)}
        />
      </label>
      <br />

      </section>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
      { filteredRecipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>

    </div>
  );
}

export default RecipeListPage;

