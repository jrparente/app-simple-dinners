import React from "react";
import { ChevronsRight } from "lucide-react";
import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

function Nav({ isSidebarOpen, resetSidebar }) {
  if (isSidebarOpen) return null;

  return (
    <nav className={styles.navbar}>
      <div role="button" onClick={() => resetSidebar()} className="iconButton">
        <ChevronsRight />
      </div>
      <NavLink to="/" className={styles.logo}>
        Meal Plan Generator
      </NavLink>
    </nav>
  );
}

export default Nav;
