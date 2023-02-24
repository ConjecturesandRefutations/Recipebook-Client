import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Row, Select } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";

import RecipeCard from "../components/RecipeCard";
import AddRecipe from "../components/AddRecipe";
import SearchBar from "../components/Search";

import { AuthContext } from './../context/auth.context'
import { ThemeContext } from './../context/theme.context'; 

import defaultProfile from '../images/defaultProfile.jpg';
import noRecipes from '../images/hungry.jpg'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

const ProfilePage = () => {
  const { theme } = useContext(ThemeContext);
  const { user, logOutUser, setUser } = useContext(AuthContext);

  const [myRecipes, setMyRecipes] = useState([]);
  const [displayForm, setDisplayForm] = useState(false)

  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [query, setQuery] = useState('');
  const [courseType, setCourseType] = useState('');

  const [loading, setLoading] = useState(true);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    axios.get(`${API_URL}/api/users`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(response => {
      setUser({
        ...user,
        image: response.data.image,
      });
    })
    .catch(err => console.log(err))
  }, []);

  

const getMyRecipes = () => {
  const storedToken = localStorage.getItem("authToken");

  axios
.get(`${API_URL}/api/recipes/user/${user._id}`,
{ headers: { Authorization: `Bearer ${storedToken}` } })
.then((response) => {
  setMyRecipes(response.data);
  })
  .then(setLoading(false))
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

const reversedRecipes = [...myFilteredRecipes].reverse();

const deleteUser = () => {
  const storedToken = localStorage.getItem('authToken');

  axios.delete(`${API_URL}/auth/user/delete`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  })
  .then((response) => {
    if (response.status === 200) {
      // User account has been deleted, so redirect to login page
      logOutUser()
    } else {
      console.log('Server responded with status:', response.status);
    }
  })
};

const handleFileUpload = (e) => {
  console.log("handleFileUpload called");
  const storedToken = localStorage.getItem('authToken');
  const uploadData = new FormData();
   
  uploadData.append("image", e.target.files[0]);
   
  console.log("Sending axios post request");
  axios.post(`${API_URL}/api/user/upload`, uploadData, {
    headers: { Authorization: `Bearer ${storedToken}` },
  })
  .then(response => {
    setImageUrl(response.data.fileUrl);
    axios.put(`${API_URL}/api/users`, { image: response.data.fileUrl }, {
      headers: { Authorization: `Bearer ${storedToken}` },
    })
    .then(response => {
      setUser({
        ...user,
        image: response.data.image,
      });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log("Error while uploading the file: ", err));
};

const handleSubmit = (e) => {
  e.preventDefault();
  const storedToken = localStorage.getItem('authToken');
  const data = new FormData();
  data.append('image', e.target.image.files[0]);

  axios.put(`${API_URL}/api/users`, { image: imageUrl }, {
    headers: { Authorization: `Bearer ${storedToken}` },
  })
  .then(response => {
    setUser({
      ...user,
      image: response.data.image,
    });
    setImageUrl(response.data.image);
  })
  .catch(err => console.log(err))
  }

return (
  <div className={'myRecipes ' + theme}>


 <section id='userInfo'>
 <img alt='profile_image' src={user.image ? user.image : defaultProfile} id='defaultProfilePic'/>
 <form onSubmit={handleSubmit} className='uploadimage'>
                            <input type="file" name="imageUrl" onChange={(e) => handleFileUpload(e)} />
                            
                        </form>
        {showDeleteConfirmation ? ( 
          <>
            <h4 id='checking'>Are you sure you want to delete your account?!</h4>
            <div id='yesNo'>
            <p onClick={() => deleteUser()} id='yes'>Yes</p>
            <p onClick={() => setShowDeleteConfirmation(false)} id='no'>No</p>
            </div>
          </>
        ) : ( // Render Delete Account element with click event handler to show delete confirmation
          <p id='deleteAccount' onClick={() => setShowDeleteConfirmation(true)}>Delete Account</p>
        )}
<p style={{fontWeight: 'bold'}} id='userName'>{user.name}</p>
 </section>


   <section className='profileMain'>
    <h2 className='myRecipesTitle'>My Recipes</h2>

<div id='reCentering'>
    <button onClick={()=> setDisplayForm(!displayForm)} id='showFormToggleTwo'>{displayForm ? 'Hide Add Recipe Form' : 'Click to Add Recipe'}</button>
      {displayForm && <AddRecipe refreshRecipes={getMyRecipes} /> }

      <SearchBar setQueryProp={setQuery}/>
      </div>

      </section>

      <section >
      <div id="courseTypeSelect">
      <p className='courseType'>Course Type:</p>
        <Select
          value={courseType}
          onChange={(value) => setCourseType(value)}
          style={{ width: 200 }}
          className="courseTypeFilter">

          <Select.Option value="">All</Select.Option>
          <Select.Option value="Starter">Starter</Select.Option>
          <Select.Option value="Main">Main</Select.Option>
          <Select.Option value="Dessert">Dessert</Select.Option>
          <Select.Option value="Snack">Snack</Select.Option>
          <Select.Option value="Breakfast">Breakfast</Select.Option>
          <Select.Option value="Other">Other</Select.Option>
        </Select>
        </div>
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

      {loading ? <ClipLoader color="#36d7b7" /> : null}

      <Row style={{ width: '100%', justifyContent: 'center' }}>
      { reversedRecipes.map((recipe) => <RecipeCard key={recipe._id} {...recipe} />  )} 
      </Row>

      {(myRecipes.length === 0) ? (
        <div className='noRecipes'>
          <ClipLoader color="red" className='clip'/>
          <h3>You haven't added any Recipes! Get Cooking!</h3>
          <img src={noRecipes} height={325} width={300} alt='No Recipes'/>
        </div>
) : null}


  </div>
);
};

export default ProfilePage;