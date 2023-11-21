import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LogOut, Plus, User, Utensils, Soup, ChevronLeft } from "lucide-react";

function Sidebar({ isMobile, isSidebarOpen, collapseSidebar }) {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const params = useLocation();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.clear();
    navigate("/");
  };

  const handleLogout = () => {
    if (!cookies.access_token) {
      navigate("/auth");
    } else {
      logout();
    }
  };

  return (
    <aside
      className={`${isMobile && "styles.mobileSidebar"} ${"sidebar"}`}
      aria-label="Sidebar"
    >
      <div className="flex w-full align-center">
        <NavLink to="/dashboard" className={"logo"}>
          Meal Plan Generator
        </NavLink>
        <div
          role="button"
          onClick={() => collapseSidebar()}
          className="iconButton"
        >
          {isSidebarOpen && <ChevronLeft />}
        </div>
      </div>

      <ul className={"nav"}>
        <li>
          <NavLink
            to="/create-recipe"
            className={`${"menuLink"} ${
              params.pathname === "/create-recipe" && "active"
            }`}
          >
            <Plus className={"linkIcon"} /> Add New Recipe
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard"
            className={`${"menuLink"} ${
              params.pathname === "/dashboard" && "active"
            }`}
          >
            <Soup className={"linkIcon"} /> View All Recipes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/meal-plan"
            className={`${"menuLink"} ${
              params.pathname === "/meal-plan" && "active"
            }`}
          >
            <Utensils className={"linkIcon"} /> Meal Plan
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={`${"menuLink"} ${
              params.pathname === "/profile" && "active"
            }`}
          >
            <User className={"linkIcon"} /> Profile
          </NavLink>
        </li>
        <li
          className={`${"logoutButton"}`}
          onClick={handleLogout}
          role="button"
        >
          <LogOut className={"linkIcon"} />
          Logout
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
