import React from "react";
import { ChevronsRight } from "lucide-react";
import styles from "./nav.module.css";

function Nav({ isSidebarOpen, resetSidebar }) {
  return (
    <nav className={styles.navbar}>
      {!isSidebarOpen && (
        <div
          role="button"
          onClick={() => resetSidebar()}
          className="iconButton"
        >
          <ChevronsRight />
        </div>
      )}
    </nav>
  );
}

export default Nav;
