import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import RecipeListPage from "./pages/RecipeListPage";
import RecipeDetailsPage from "./pages/RecipeDetailsPage";
import EditRecipePage from "./pages/EditRecipePage";

function App() {

  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/recipes" element={<RecipeListPage />} />
        <Route exact path="/recipes/:recipeId" element={<RecipeDetailsPage />} />
        <Route exact path="/recipes/edit/:recipeId" element={<EditRecipePage />} />           
      </Routes>
    </div>
  );
}

export default App;
