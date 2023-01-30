 
import { NavLink } from 'react-router-dom';
 
import { useContext } from 'react'; // <== ADD
import { ThemeContext } from './../context/theme.context'; 

import sunMoon from './../images/sunMoon.jpg'

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
    <nav nav className={'Navbar ' + theme}>
      <NavLink to="/">
        <button>Home</button>
      </NavLink>

      <NavLink to="/recipes">
        <button>Recipes</button>
      </NavLink>

      <button className="theme-btn" onClick={toggleTheme} id='toggleTheme'>
        {theme === 'light' ? 'dark ' : 'light '}<img src={sunMoon} alt='sunMoon' id='sunMoon'/>
      </button>

    </nav>

    
    </div>
  );
}

export default Navbar;
