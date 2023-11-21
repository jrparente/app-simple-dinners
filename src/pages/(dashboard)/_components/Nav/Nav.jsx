import React from "react";
import { ChevronsRight } from "lucide-react";
import { NavLink } from "react-router-dom";

function Nav({ isSidebarOpen, resetSidebar }) {
  if (isSidebarOpen) return null;

  return (
    <nav className={"navbar"}>
      <div role="button" onClick={() => resetSidebar()} className="iconButton">
        <ChevronsRight />
      </div>
      <NavLink to="/" className={"logo"}>
        Meal Plan Generator
      </NavLink>
    </nav>
  );
}

export default Nav;
