import React from "react";
import cooking from "../../public/cooking.svg";

export default function Header(props) {
  return (
    <header className="header flex">
      <button onClick={props.getAllDinners}>
        {props.weeklyDinners.length > 0
          ? `Give me a new Menu`
          : `Generate Dinners`}
      </button>

      {props.weeklyDinners.length > 0 ? (
        <button onClick={props.saveMenu}>Save Menu</button>
      ) : (
        <button onClick={props.getSavedMenu}>Get Saved Menu</button>
      )}

      {/* <img src={cooking} className="logo" /> */}
    </header>
  );
}
