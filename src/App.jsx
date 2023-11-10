import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Auth from "./pages/Auth/Auth";
import MealPlan from "./pages/MealPlan/MealPlan";
import Profile from "./pages/Profile/Profile";
import CreateRecipe from "./pages/Recipes/CreateRecipe";
import RecipePage from "./pages/Recipes/RecipePage/[id]";
import EditRecipe from "./pages/Recipes/EditRecipe";

// import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/recipe/:recipeId" element={<RecipePage />} />
            <Route path="/create-recipe" element={<CreateRecipe />} />
            <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
            <Route path="/meal-plan" element={<MealPlan />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
