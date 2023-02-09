import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Select } from 'antd';

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
  const [courseType, setCourseType] = useState('');

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
      && (!isVegan || recipe.isVegan)
      && (courseType === '' || recipe.courseType === courseType);
  });
  
  return (
    
    <div className={"RecipeListPage " + theme}>
      
      <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggle'>{displayForm ? 'Hide Add Recipe Form' : 'Click to Add Recipe'}</button>
      {displayForm && <AddRecipe refreshRecipes={getAllRecipes} />}
      
      <SearchBar setQueryProp={setQuery}/>

      <section className="courseTypeFilter">
      <p>Course Type:</p>
        <Select
          value={courseType}
          onChange={(value) => setCourseType(value)}
          style={{ width: 200 }}
        >
          <Select.Option value="">All</Select.Option>
          <Select.Option value="Starter">Starter</Select.Option>
          <Select.Option value="Main">Main</Select.Option>
          <Select.Option value="Dessert">Dessert</Select.Option>
          <Select.Option value="Snack">Snack</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
      </section>

      <section className="veggieCheckboxes">
      <label>
        Vegetarian:
        <input
          type="checkbox"
          checked={isVegetarian}
          onChange={(event) => setIsVegetarian(event.target.checked)}
        />
      </label>
      <br />
      <label>
        Vegan:
        <input
          type="checkbox"
          checked={isVegan}
          onChange={(event) => setIsVegan(event.target.checked)}
        />
      </label>
      </section>

      <Row style={{ width: '100%', justifyContent: 'center' }}>
      { filteredRecipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>

    </div>
  );
}

export default RecipeListPage;

