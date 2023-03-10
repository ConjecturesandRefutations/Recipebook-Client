import { NavLink, useMatch } from "react-router-dom";
 
import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from "./../context/auth.context";

import cutlery from './../images/cutlerynoback.png'
import sunMoon from './../images/sunMoon.jpg'

function Navbar() {

  const profileMatch = useMatch("/recipes/user/:userId");
  const recipesMatch = useMatch("/recipes");

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn, logOutUser } = useContext(AuthContext);


  function changeToggleId(theme){
      if (theme === 'dark'){
        return 'darkToggle'
      } else {
         return 'lightToggle'
      }
  };


  return (
    <div>


    <nav nav className={'Navbar ' + theme}>

    {isLoggedIn && (
      <div className='navbarLoggedIn'>

    <section id='pageSelect'>
      <NavLink to="/"  className={({ isActive }) => isActive ? "selected" : ""}>
        <button id='homeButton'>Home</button>
      </NavLink>

      <NavLink
        to="/recipes"
        className={recipesMatch ? "selected" : ""}
      >
        <button id='recipesButton'>Recipes</button>
      </NavLink>

      <NavLink
        to={`/recipes/user/${profileMatch?.params.userId}`}
        className={profileMatch ? "selected" : ""}
      >
        <button id='navProfileButton'>Profile</button>
      </NavLink>

    </section>

    <img src={cutlery} alt='cutlery' width={50} height={50} className='cutlery'/>

    <section className='toggleThemeTwo'>
      <button onClick={toggleTheme} id={changeToggleId(theme)} className="toggleButtons">
        {theme === 'light' ? 'dark ' : 'light '}<img src={sunMoon} alt='sunMoon' id='sunMoon'/>
      </button>
      <button onClick={logOutUser} className="toggleButtons">Logout</button>
      </section>

      </div>
      )}

{!isLoggedIn && (
  
  <div className='navbarLoggedOut'>
        
        <section id='authButtons'>
          <NavLink to="/signup" className={({ isActive }) => isActive ? "selected" : ""}> <button>Sign Up</button> </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? "selected" : ""}> <button>Login</button> </NavLink>
          </section>

          <img src={cutlery} alt='cutlery' width={50} height={50} className='cutlery'/>

      <section className='toggleTheme'>
        <button onClick={toggleTheme} id={changeToggleId(theme)}>
        {theme === 'light' ? 'dark ' : 'light '}<img src={sunMoon} alt='sunMoon' id='sunMoon'/>
      </button>
      </section>

      </div>
      )}      

    </nav>

    
    </div>
  );
}

export default Navbar;
