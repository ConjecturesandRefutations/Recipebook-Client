import { useState, useContext } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth.context';
import defaultProfile from '../images/defaultProfile.jpg';

const Test = () => {
    const [imageUrl, setImageUrl] = useState("");
    const {isLoggedIn, user, logOutUser, setUser } = useContext(AuthContext);

    const handleFileUpload = (e) => {
        // console.log("The file to be uploaded is: ", e.target.files[0]);
     
        const uploadData = new FormData();
     
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new movie in '/api/movies' POST route
        uploadData.append("imageUrl", e.target.files[0]);
     
        // service
        //   .uploadImage(uploadData)
        axios.post("http://localhost:5005/api/upload", uploadData)
          .then(response => {
            // console.log("response is: ", response);
            // response carries "fileUrl" which we can use to update the state
            setImageUrl(response.data.fileUrl);
          })
          .catch(err => console.log("Error while uploading the file: ", err));
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        const storedToken = localStorage.getItem('authToken');
        const data = new FormData();
        data.append('imageUrl', imageUrl); // use the imageUrl from state
      
        axios.put("http://localhost:5005/api/users", data, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })        
        .then(response => {
          console.log(' put response data', response.data)
          setUser({
            ...user,
            image: response.data.imageUrl,
          });
        })
        .catch(err => console.log(err))
      }
      
      

  return (
    <div>
        <h1>HomePage</h1>
        {isLoggedIn && <>
                        <p>Welcome back {user.username}</p>
                        <img alt={'profile_image'} src={user.image ? user.image : defaultProfile} style={{width: '50px', height: '50px', borderRadius: '75%'}}/>
                        <button onClick={logOutUser}>Log out</button>
                        <br />

                        <h2>Update image form</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="file" name="imageUrl" onChange={(e) => handleFileUpload(e)} />
                            <button type="submit">Update User Image</button>
                        </form>
                        </>}
        {!isLoggedIn && <>
            <Link to={'/signup'}><button>SignUp</button></Link>
            <Link to={'/login'}><button>Login</button></Link>
        </>}
    </div>
  )
}

export default Test;