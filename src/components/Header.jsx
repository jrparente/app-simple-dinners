import React from "react";

export default function Header(props) {
  return (
    <header className="header flex">
      <button onClick={props.createNewMeal}>New Menu</button>
    </header>
  );
}
