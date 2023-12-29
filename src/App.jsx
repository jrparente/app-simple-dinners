import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";

import Footer from "./components/Footer/Footer";

import Home from "./pages/(marketing)/Home/Home";
import Auth from "./pages/(marketing)/Auth/Auth";
import Header from "./pages/(marketing)/_components/Header/Header";

import MealPlan from "./pages/(dashboard)/MealPlan/MealPlan";
import Profile from "./pages/(dashboard)/Profile/Profile";
import CreateRecipe from "./pages/(dashboard)/Recipes/CreateRecipe";
import RecipePage from "./pages/(dashboard)/Recipes/RecipePage/[id]";
import EditRecipe from "./pages/(dashboard)/Recipes/EditRecipe";
import Dashboard from "./pages/(dashboard)/Dashboard/Dashboard";
import Sidebar from "./pages/(dashboard)/_components/Sidebar/Sidebar";
import Nav from "./pages/(dashboard)/_components/Nav/Nav";

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 596);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const collapseSidebar = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  };

  const resetSidebar = () => {
    setIsSidebarOpen(true);
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const isWindowMobile = window.innerWidth < 596;
        if (isWindowMobile !== isMobile) setIsMobile(isWindowMobile);
      },
      false
    );
  }, [isMobile]);

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
          <div className="flex w-full">
            {isSidebarOpen && (
              <Sidebar
                isMobile={isMobile}
                isSidebarOpen={isSidebarOpen}
                collapseSidebar={collapseSidebar}
              />
            )}
            <div
              className="main-content"
              style={{ marginLeft: isSidebarOpen ? "20rem" : "0" }}
            >
              <Nav isSidebarOpen={isSidebarOpen} resetSidebar={resetSidebar} />
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
          </div>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
