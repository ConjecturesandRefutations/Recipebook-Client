import axios from "axios";
const storedToken = localStorage.getItem('authToken');
 

const api = axios.create({
  
  baseURL: `${process.env.REACT_APP_API_URL}/api` || "http://localhost:5005/api" ,
  headers:  { Authorization: `Bearer ${storedToken}` } 
  
});
 
const errorHandler = (err) => {
  throw err;
};
 
const getRecipes = () => {
  return api.get("/recipes")
    .then((res) => res.data)
    .catch(errorHandler);
};
 
const uploadImage = (file) => {
  const storedToken = localStorage.getItem('authToken');
  return api.post("/upload", file, { Authorization: `Bearer ${storedToken}` } )
    .then(res => res.data)
    .catch(errorHandler);
};
 
const createRecipe = (newRecipe) => {
  return api.post("/recipes", newRecipe)
    .then(res => res.data)
    .catch(errorHandler);
};
 
const exportedObject = {
  getRecipes,
  uploadImage,
  createRecipe,
};

export default exportedObject;