import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { Input } from 'antd';
import ClipLoader from "react-spinners/ClipLoader";
import { ThemeContext } from './../context/theme.context';
import lightLogo from '../images/lightLogo.png'
import darkLogo from '../images/darkLogo.png'

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  function changeLogoSrc(theme){
    if (theme === 'dark'){
      return darkLogo
    } else {
       return lightLogo
    }
  };

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirmPassword = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password, confirmPassword };

    setLoading(true);

    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        axios.post(`${API_URL}/auth/login`, { email, password })
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

          <label>Confirm Password:</label>
          <Input type="password" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPassword} />

          <button type="submit" className="loginSignupButton" >Sign Up</button>
        </form>

        { errorMessage && <p className="error-message">{errorMessage}</p> }

        <p className="redirectMessages">Already have an account?</p>
        <Link to={"/login"}> Login</Link>
      </div>

      <img src={changeLogoSrc(theme)} alt="recipeLogo" className="logo"/>
    </div>
  );
}

export default SignupPage;
