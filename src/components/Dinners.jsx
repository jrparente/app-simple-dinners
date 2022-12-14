import React from "react";
import { nanoid } from "nanoid";

export default function Dinners(props) {
  let dinner = [];
  const menu = props.currentMenu.menu;

  menu.map((item) => {
    Array.isArray(item)
      ? (dinner = [...dinner, item.map((ingredient) => ingredient + ", ")])
      : (dinner = [...dinner, item.name]);
  });

  return (
    <section className="dinners">
      <p className="title">Dinners:</p>
      <ol>
        {dinner.map((item) => (
          <li className="dinner-list" key={nanoid()}>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );
}
