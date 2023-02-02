import { useState } from "react";
import axios from "axios";
import { Input } from 'antd';
import service from "../api/service";

const API_URL = "http://localhost:5005";

function AddRecipe(props) {
  const [name, setName] = useState("");
  const [instructions, setInstructions] = useState("");
  const [imgUrl, setImgUrl] = useState("");

    // ******** this function handles the file upload ********
    const handleFileUpload = (e) => {
       console.log("The file to be uploaded is: ", e.target.files[0]);
    
  
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

    const requestBody = { name, instructions, imgUrl };

    const storedToken = localStorage.getItem('authToken');
    
    axios
      .post(`${API_URL}/api/recipes`, requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } } 
      )
      .then((response) => {
        // Reset the state
        setName("");
        setInstructions("");
        setImgUrl("");
        props.refreshRecipes();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddRecipe">
      <h3>Add Recipe</h3>

      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Instructions:</label>
        <textarea
          type="text"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
          
          <label>Photo (optional):</label>
          <input type="file" onChange={(e) => handleFileUpload(e)} />

        <button type="submit" id="submitRecipe">Submit</button>
      </form>
    </div>
  );
}

export default AddRecipe;