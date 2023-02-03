import axios from "axios";
const storedToken = localStorage.getItem('authToken');
 
const api = axios.create({
  
  baseURL: "http://localhost:5005/api",
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
  return api.post("/upload", file)
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