import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { Input } from 'antd';
import { ThemeContext } from './../context/theme.context';
import lightLogo from '../images/lightLogo.png'
import darkLogo from '../images/darkLogo.png'

const API_URL = "http://localhost:5005";


function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  function changeLogoSrc(theme){
    if (theme === 'dark'){
      return darkLogo
    } else {
       return lightLogo
    }
};

  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        /* console.log("JWT token", response.data.authToken); */
        
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
      	const errorDescription = error.response.data.message;
      	setErrorMessage(errorDescription);
    	})
  };
  
  return (
    <div className={"loginPage " + theme}>

      <div id="loginInput">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit} className='loginSignupForm'>
        <label>Email:</label>
        <Input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <Input type="password" name="password" value={password} onChange={handlePassword} />

        <button type="submit" className="loginSignupButton" >Login</button>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p className="redirectMessages">Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
      </div>

      <img src={changeLogoSrc(theme)} alt="recipeLogo" className="logo"/>
    </div>
  )
}

export default LoginPage;