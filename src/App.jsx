import React, { useState } from "react";
import Dinners from "./components/Dinners";
import Ingredients from "./components/Ingredients";
import ShoppingList from "./components/ShoopingList";

function App() {
  function randomIngredient(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function makeDinner(proteins, carbs, vegs) {
    return [
      randomIngredient(proteins),
      randomIngredient(carbs),
      randomIngredient(vegs),
      randomIngredient(vegs),
      randomIngredient(vegs),
    ];
  }

  let [bigMealsIngredients, setBigMealsIngredients] = useState([]);
  function randomBigMeal(bigMeals) {
    const randomNumber = Math.floor(Math.random() * bigMeals.length);

    const ingredient = [bigMeals[randomNumber].ingredients];
    setBigMealsIngredients(ingredient);
    return {
      name: [bigMeals[randomNumber].name],
      ingredients: [bigMeals[randomNumber].ingredients],
    };
  }

  const [weeklyDinners, setWeeklyDinners] = useState([]);

  function getAllDinners() {
    setWeeklyDinners([
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      randomBigMeal(Ingredients.bigMeals).name,
    ]);
    makeShoppingList();
  }

  const [shoppingList, setShoppingList] = useState([]);

  function makeShoppingList() {
    let list = [];
    weeklyDinners.map((dinner) => {
      if (dinner.length === 5) {
        return (list = [...list, ...dinner]);
      } else {
        return (list = [...list, ...bigMealsIngredients]);
      }
    });
    setShoppingList(list);
  }

  const displayDinners = weeklyDinners.map((dinner) => (
    <Dinners dinner={dinner} key={dinner.toString()} />
  ));

  return (
    <div className="App container">
      <p>Dinners:</p>
      <ul>{displayDinners}</ul>

      <ShoppingList list={shoppingList} />

      <button onClick={getAllDinners}>Give me the Dinners</button>
    </div>
  );
}

export default App;
