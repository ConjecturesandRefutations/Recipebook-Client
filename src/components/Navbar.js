 
import { NavLink } from 'react-router-dom';
 
import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from "./../context/auth.context";

import sunMoon from './../images/sunMoon.jpg'

function Navbar() {

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

      <NavLink to="/recipes"  className={({ isActive }) => isActive ? "selected" : ""}>
        <button id='recipesButton'>Recipes</button>
      </NavLink>
    </section>

    <section className='toggleThemeTwo'>
      <button onClick={toggleTheme} id={changeToggleId(theme)}>
        {theme === 'light' ? 'dark ' : 'light '}<img src={sunMoon} alt='sunMoon' id='sunMoon'/>
      </button>
      <button onClick={logOutUser} className="logoutButton">Logout</button>
      </section>

      </div>
      )}

{!isLoggedIn && (
  
  <div className='navbarLoggedOut'>
        
        <section id='authButtons'>
          <NavLink to="/signup" className={({ isActive }) => isActive ? "selected" : ""}> <button>Sign Up</button> </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? "selected" : ""}> <button>Login</button> </NavLink>
          </section>

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
