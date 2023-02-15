import { useState } from "react";
import axios from "axios";
import { Input, Select } from 'antd';
import service from "../api/service";


const { Option } = Select;
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";


function AddRecipe(props) {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [courseType, setCourseType] = useState("Other");
  const { TextArea } = Input 

    // ******** this function handles the file upload ********
    const handleFileUpload = (e) => {
       /* console.log("The file to be uploaded is: ", e.target.files[0]); */
    
       e.preventDefault();
  
      const uploadData = new FormData();
      
      uploadData.append("imgUrl", e.target.files[0] );
  
      service
        .uploadImage(uploadData)
        .then((response) => {
           console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state
          setImgUrl(response.fileUrl);
        
        })
        .catch((err) => console.log("Error while uploading the file: ", err));
    };
  


  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, ingredients, instructions, imgUrl, isVegetarian, isVegan, courseType };

    const storedToken = localStorage.getItem('authToken');
    
    axios
      .post(`${API_URL}/api/recipes`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then((response) => {
        // Reset the state
        setName("");
        setIngredients("");
        setInstructions("");
        setImgUrl("");
        setIsVegetarian(false)
        setIsVegan(false)
        setCourseType("");
        props.refreshRecipes();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddRecipe">

      <form onSubmit={handleSubmit}>

      <h3>Add Recipe</h3>
      
        <label>Name:</label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Ingredients:</label>
        <TextArea
          type="text"
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />

        <label>Instructions:</label>
        <TextArea
          type="text"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

<label>Course Type:</label>
      <Select
        value={courseType}
        onChange={(value) => setCourseType(value) } style={{ width: 400 }}>
        <Option value="Starter">Starter</Option>
        <Option value="Main">Main</Option>
        <Option value="Dessert">Dessert</Option>
        <Option value="Snack">Snack</Option>
        <Option value="Breakfast">Breakfast</Option>
        <Option value="Other">Other</Option>
      </Select>
      <br />
          
          <label>Photo (optional):</label>
          <Input type="file" onChange={(e) => handleFileUpload(e)}/>


      <section className="veganVegetarianFilters">
          <label>
        Vegetarian:
        </label>
        <input
          type="checkbox"
          checked={isVegetarian}
          onChange={(event) => setIsVegetarian(event.target.checked)}
          />
  

          <label>
        Vegan:
        </label>
        <input
          type="checkbox"
          checked={isVegan}
          onChange={(event) => setIsVegan(event.target.checked)}
        />
    </section>
     
      <br /> 

        <button type="submit" id="submitRecipe">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;