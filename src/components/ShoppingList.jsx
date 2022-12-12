import React, { useState, useEffect } from "react";

let nextID = 0;

export default function ShoppingList({ bigMeals, dinners, render }) {
  const [shoppingList, setShoppingList] = useState([]);
  let list = [];

  bigMeals.map((bigMeal) => {
    list = [...list, ...bigMeal];
  });

  for (let i = 0; i < dinners.length - bigMeals.length; i++) {
    list = [...list, ...dinners[i]];
  }

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
  }, [render]);

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
