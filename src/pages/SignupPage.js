import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";
import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context';
import { AuthContext } from "./../context/auth.context";
import axios from "axios";


import lightLogo from '../images/lightLogo.png'
import darkLogo from '../images/darkLogo.png'


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);

  const { storeToken, authenticateUser } = useContext(AuthContext);

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

  
const handleSubmit = (e) => {
  e.preventDefault();
  const requestBody = { email, password, name };

  setLoading(true);

  axios.post(`${API_URL}/auth/signup`, requestBody)
    .then((response) => {
      axios.post(`${API_URL}/auth/login`, { email, password, name })
        .then((response) => {
          storeToken(response.data.authToken);
          authenticateUser();
          navigate("/");
        })
        .catch((error) => {
          console.log("Failed to log in user after sign up: ", error);
          setErrorMessage("Failed to log in user after sign up");
        });
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    })
    .finally(() => {
      setLoading(false);
    });
};

  
  return (
    <div className={"signupPage " + theme}>

{loading ? <ClipLoader color="#36d7b7" className="clipLoader"/> : null}

<div id="signupInput">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit} className='loginSignupForm'>
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