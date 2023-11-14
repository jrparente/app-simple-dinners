import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import Footer from "./components/Footer/Footer";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/(marketing)/Home/Home";
import Auth from "./pages/(marketing)/Auth/Auth";
import MealPlan from "./pages/(dashboard)/MealPlan/MealPlan";
import Profile from "./pages/(dashboard)/Profile/Profile";
import CreateRecipe from "./pages/(dashboard)/Recipes/CreateRecipe";
import RecipePage from "./pages/(dashboard)/Recipes/RecipePage/[id]";
import EditRecipe from "./pages/(dashboard)/Recipes/EditRecipe";
import Dashboard from "./pages/(dashboard)/Dashboard/Dashboard";
import Header from "./pages/(marketing)/_components/Header/Header";

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);

  return (
    <div className="App">
      <BrowserRouter>
        {!cookies.access_token ? (
          <>
            <Header />
            <div className="w-full h-screen flex flex-col">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </div>
            <Footer />
          </>
        ) : (
          <>
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/recipe/:recipeId" element={<RecipePage />} />
                <Route path="/create-recipe" element={<CreateRecipe />} />
                <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
                <Route path="/meal-plan" element={<MealPlan />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
              <Footer />
            </div>
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
