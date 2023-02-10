import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Row, Select } from 'antd';

import RecipeCard from "../components/RecipeCard";
import AddRecipe from "../components/AddRecipe";
import SearchBar from "../components/Search";

import { AuthContext } from './../context/auth.context'
import { ThemeContext } from './../context/theme.context'; 

import defaultProfileImage from '../images/defaultProfile.jpg';

const API_URL = "http://localhost:5005";

const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [myRecipes, setMyRecipes] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)

  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [query, setQuery] = useState('');
  const [courseType, setCourseType] = useState('');

const getMyRecipes = () => {
  const storedToken = localStorage.getItem("authToken");

  axios
.get(`${API_URL}/api/recipes/user/${user._id}`,
{ headers: { Authorization: `Bearer ${storedToken}` } })
.then((response) => {
  setMyRecipes(response.data);
  })
    .catch((error) => console.log(error));
};

useEffect(() => {
  getMyRecipes();
}, [] );

const myFilteredRecipes = myRecipes.filter((recipe) => {
  return recipe.name.toLowerCase().includes(query.toLowerCase())
    && (!isVegetarian || recipe.isVegetarian || recipe.isVegan)
    && (!isVegan || recipe.isVegan)
    && (courseType === '' || recipe.courseType === courseType);
});

return (
  <div className={'myRecipes ' + theme}>
 
 <img src={defaultProfileImage} alt='profileImg' id='defaultProfilePic'/>
   
   <section className='profileMain'>
    <h2 className='myRecipesTitle'>My Recipes</h2>

    <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggleTwo'>{displayForm ? 'Hide Add Recipe Form' : 'Click to Add Recipe'}</button>
      {displayForm && <AddRecipe refreshRecipes={getMyRecipes} />}
      <SearchBar setQueryProp={setQuery}/>

      </section>

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
      { myFilteredRecipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>
      
  </div>
);
};

export default ProfilePage;