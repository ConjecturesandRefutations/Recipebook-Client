 
import { NavLink } from 'react-router-dom';
 
import { useContext } from 'react'; // <== ADD
import { ThemeContext } from './../context/theme.context'; 

import sunMoon from './../images/sunMoon.jpg'

function Navbar() {

  const { theme, toggleTheme } = useContext(ThemeContext);

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
      <NavLink to="/"  className={({ isActive }) => isActive ? "selected" : ""}>
        <button>Home</button>
      </NavLink>

      <NavLink to="/recipes"  className={({ isActive }) => isActive ? "selected" : ""}>
        <button>Recipes</button>
      </NavLink>

      <button onClick={toggleTheme} id={changeToggleId(theme)}>
        {theme === 'light' ? 'dark ' : 'light '}<img src={sunMoon} alt='sunMoon' id='sunMoon'/>
      </button>

    </nav>

    
    </div>
  );
}

export default Navbar;
