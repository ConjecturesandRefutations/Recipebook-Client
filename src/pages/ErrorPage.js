import { useContext } from "react";
import { ThemeContext } from './../context/theme.context';

function ErrorPage () {

  const { theme } = useContext(ThemeContext);

  return (
    <div className={"errorPage " + theme}>
      
      <h4>This is the Error page. </h4>

      <br />

      <p>Page Not Found!</p>
    </div>
  );
};

export default ErrorPage;
