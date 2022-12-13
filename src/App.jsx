import React, { useState } from "react";
import Dinners from "./components/Dinners";
import Ingredients from "./components/Ingredients";
import ShoppingList from "./components/ShoppingList";
import Header from "./components/Header";

function App() {
  // Generate random ingredient
  function randomIngredient(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Create a simple plate with 5 ingredients: 1 protein + 1 carb + 3 veg
  function makeDinner(proteins, carbs, vegs) {
    return [
      randomIngredient(proteins),
      randomIngredient(carbs),
      randomIngredient(vegs),
      randomIngredient(vegs),
      randomIngredient(vegs),
    ];
  }

  // Generate one random Meal from the bigMeals Array of objects
  const [bigMealsIngredients, setBigMealsIngredients] = useState([]);
  function randomBigMeal(bigMeals) {
    const randomNumber = Math.floor(Math.random() * bigMeals.length);

    const ingredient = [bigMeals[randomNumber].ingredients];
    setBigMealsIngredients(ingredient);

    return {
      name: [bigMeals[randomNumber].name],
      ingredients: [bigMeals[randomNumber].ingredients],
    };
  }

  // Create 5 dinners: 4 simple plates + 1 big meal
  const [weeklyDinners, setWeeklyDinners] = useState([]);

  function getAllDinners() {
    setWeeklyDinners([
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
      randomBigMeal(Ingredients.bigMeals).name,
    ]);
  }

  // Display all meals created in the DOM
  let displayDinners = weeklyDinners.map((dinner) => (
    <Dinners dinner={dinner} key={dinner.toString()} />
  ));

  // Save menu to local storage
  function saveMenu() {
    localStorage.setItem("weeklyDinners", JSON.stringify(weeklyDinners));
  }

  // Get menu from local Storage
  function getSavedMenu() {
    setWeeklyDinners(JSON.parse(localStorage.getItem("weeklyDinners")));
    displayDinners = weeklyDinners;
  }

  return (
    <div className="App container flex">
      <Header
        getAllDinners={getAllDinners}
        saveMenu={saveMenu}
        getSavedMenu={getSavedMenu}
        weeklyDinners={weeklyDinners}
      />

      {weeklyDinners.length > 0 && (
        <>
          <section className="dinners">
            <p className="title">Dinners:</p>
            <ol>{displayDinners}</ol>
          </section>

          <ShoppingList
            dinners={weeklyDinners}
            bigMeals={bigMealsIngredients}
            render={displayDinners}
          />
        </>
      )}
    </div>
  );
}

export default App;
