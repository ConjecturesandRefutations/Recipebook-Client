import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from 'antd';
import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context';
import axios from "axios";

import lightLogo from '../images/lightLogo.png'
import darkLogo from '../images/darkLogo.png'


const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  function changeLogoSrc(theme){
    if (theme === 'dark'){
      return darkLogo
    } else {
       return lightLogo
    }
};

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  
  return (
    <div className={"signupPage " + theme}>

<div id="signupInput">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit} className='loginSignupForm'>
        <label>Email:</label>
        <Input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <Input type="password" name="password" value={password} onChange={handlePassword} />

        <label>Name:</label>
        <Input type="text" name="name" value={name} onChange={handleName} />

        <button type="submit" className="loginSignupButton">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p className="redirectMessages">Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
    <img src={changeLogoSrc(theme)} alt="recipeLogo" className="logo"/>
    </div>
  )
}

export default SignupPage;