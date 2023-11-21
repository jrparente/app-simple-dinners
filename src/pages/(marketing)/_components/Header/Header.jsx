import React from "react";
import styles from "./header.module.css";
import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          Meal Plan Generator
        </Link>

        <div className={styles.navLinks}>
          <NavLink to="/auth" className={styles.loginBtn}>
            Log in
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
