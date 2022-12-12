import React from "react";

export default function Header(props) {
  return (
    <header className="header">
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
    </header>
  );
}
