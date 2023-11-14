import React, { useState } from "react";
import styles from "./sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { LogOut, Plus, User, Utensils, Soup } from "lucide-react";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);

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
    <aside className={styles.sidebar} aria-label="Sidebar">
      <div>
        <NavLink to="/" className={styles.logo}>
          Meal Plan Generator
        </NavLink>
      </div>
      <ul className={styles.nav}>
        {!cookies.access_token ? (
          <li className={`navlink ${isOpen && "navOpen"}`}>
            <button onClick={() => navigate("/auth")}>Get Started</button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/create-recipe" className={styles.menuLink}>
                <Plus className={styles.linkIcon} /> Add New Recipe
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard" className={styles.menuLink}>
                <Soup className={styles.linkIcon} /> View All Recipes
              </NavLink>
            </li>
            <li>
              <NavLink to="/meal-plan" className={styles.menuLink}>
                <Utensils className={styles.linkIcon} /> Meal Plan
              </NavLink>
            </li>
            <li>
              <NavLink to="/profile" className={styles.menuLink}>
                <User className={styles.linkIcon} /> Profile
              </NavLink>
            </li>
            <li
              className={`${styles.logoutButton} ${styles.menuLink}`}
              onClick={handleLogout}
              role="button"
            >
              <LogOut className={styles.linkIcon} />
              Logout
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}

export default Sidebar;
