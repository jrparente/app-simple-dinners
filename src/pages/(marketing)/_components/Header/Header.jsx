import React from "react";
import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

function Header() {
  const userID = window.localStorage.getItem("userID");
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.logo}>
          Meal Plan Generator
        </NavLink>

        <div className={styles.navLinks}>
          {!userID ? (
            <NavLink to="/auth" className={styles.loginBtn}>
              Log in
            </NavLink>
          ) : (
            <NavLink to="/dashboard" className={styles.getStartedBtn}>
              Get started
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
