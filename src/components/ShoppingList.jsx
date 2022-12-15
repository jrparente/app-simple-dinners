import React, { useState, useEffect } from "react";

let nextID = 0;

export default function ShoppingList(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = props.currentMenu.menu;
  const [shoppingList, setShoppingList] = useState([]);
  let list = [];

  menu.map((item) => {
    Array.isArray(item)
      ? (list = [...list, ...item])
      : (list = [...list, ...item.ingredients[0]]);
  });

  // Count number of duplicate ingredients, so that latter we can
  // display them on one line
  const counts = {};
  list.map((item) => {
    counts[item] = counts[item] ? counts[item] + 1 : 1;
  });

  useEffect(() => {
    for (const [ingredient, num] of Object.entries(counts)) {
      setShoppingList((prevState) => [
        ...prevState,
        { id: nextID++, produce: ingredient, count: num },
      ]);
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      setShoppingList([]);
    };
  }, [props]);

  // Multiply shopping list item numbers per household number
  console.log(shoppingList);

  return (
    <section className="shopping-list">
      <p className="title">Shopping List:</p>
      <ul>
        {shoppingList.map((listItem) => (
          <li key={listItem.id}>
            {listItem.produce}: {listItem.count}
          </li>
        ))}
      </ul>
    </section>
  );
}
