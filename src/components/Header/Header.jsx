import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import { useCookies } from "react-cookie";
import { Menu } from "lucide-react";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 576);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to="/">Meal Plan Generator</NavLink>
      </div>
      <div
        role="button"
        className={styles.mobileMenuButton}
        aria-label="Toggle Menu"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Menu />
      </div>
      {isOpen && (
        <div
          className={styles.mobileMenuOverlay}
          onClick={() => setIsOpen(false)}
        />
      )}

      {(isOpen || !isMobile) && (
        <ul className={styles.nav}>
          {!cookies.access_token ? (
            <li className={`navlink ${isOpen && "navOpen"}`}>
              <button onClick={() => navigate("/auth")}>Get Started</button>
            </li>
          ) : (
            <>
              <li className="navlink">
                <NavLink to="/create-recipe">Add New Recipe</NavLink>
              </li>
              <li className="navlink">
                <NavLink to="/meal-plan">Meal Plan</NavLink>
              </li>
              <li className="navlink">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li className="navlink">
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          )}
        </ul>
      )}
    </header>
  );
}

export default Header;
