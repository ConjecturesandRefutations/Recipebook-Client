import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import EditRecipePage from "./pages/EditRecipePage";
import ProfilePage from "./pages/ProfilePage";
import ErrorPage from "./pages/ErrorPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<IsPrivate><HomePage /></IsPrivate>} />
        <Route exact path="/recipes" element={<IsPrivate><RecipeListPage /></IsPrivate>} />
        <Route exact path="/recipes/:recipeId" element={<IsPrivate><RecipeDetailsPage /></IsPrivate>} />
        <Route exact path="/recipes/edit/:recipeId" element={<IsPrivate><EditRecipePage /></IsPrivate>} />
        <Route exact path="/recipes/:userId" element={<IsPrivate><ProfilePage/></IsPrivate>} /> 

        <Route path="/signup" element={<IsAnon> <SignupPage /> </IsAnon>} />
        <Route path="/login" element={<IsAnon> <LoginPage /> </IsAnon>} />

        <Route path="*" element={ <ErrorPage /> }/>

      </Routes>
    </div>
  );
}

export default App;
