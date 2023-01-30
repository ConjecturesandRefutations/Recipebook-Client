import { useContext } from 'react'; 
import { ThemeContext } from './../context/theme.context'; 

function HomePage() {
  const { theme } = useContext(ThemeContext);

    return (
      <div className={'HomePage ' + theme}>
        <h1>Recipebook</h1>
      </div>
    );
  }
  
  export default HomePage;