import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 
import { AuthContext } from "./../context/auth.context";

function HomePage() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

    return (
      <div className={'HomePage ' + theme}>
        <h1 id='title'>Recipebook</h1>
        <p id='welcome'>Hello {user && user.name}!</p>
      </div>
    );
  }
  
  export default HomePage;