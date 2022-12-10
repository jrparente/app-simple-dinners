import React, { useState } from "react";

// 📝 To-dos:
// Store ingredients in arrays ✅
// Select Random ingredients from a meal ✅
// Add and select entire meals alongside random ingredients
// Generate a shopping list from all the required produce
// Render results in the DOM

function App() {
  const proteins = [
    "chicken",
    "codfish",
    "whitefish",
    "canned tuna",
    "tuna steak",
  ];
  const carbs = [
    "boiled potatoes",
    "french fries",
    "pasta",
    "noisettes",
    "rice",
  ];
  const vegs = [
    "broccoli",
    "tomatoes",
    "carrots",
    "cauliflower",
    "bell peppers",
  ];
  const readyMeals = ["spaghetti carbonara", "lasagna", "pizza", "hamburguer"];

  function randomIngredient(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  let [dinnerPlate, setDinnerPlate] = useState([]);

  function getDinners() {
    setDinnerPlate([
      randomIngredient(proteins),
      randomIngredient(carbs),
      randomIngredient(vegs),
      randomIngredient(vegs),
      randomIngredient(vegs),
    ]);
    console.log(dinnerPlate);
  }

  return (
    <div className="App container">
      <p>Dinners:</p>
      <p>Shopping List:</p>
      <button onClick={getDinners}>Give me the Dinners</button>
    </div>
  );
}

export default App;
