import React, { useState } from "react";
import styles from "../../recipes.module.css";
import { ingredients } from "../../../../data/ingredients";
import { Sparkles } from "lucide-react";

function RandomRecipeGenerator({ saveRecipe, userOwnerId }) {
  const { carbs, proteins, vegs } = ingredients;
  const [dinner, setDinner] = useState({});
  const [dinnerIngredients, setDinnerIngredients] = useState([]);

  const getRandomIngredient = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const makeDinner = () => {
    const ingredients = [];
    ingredients.push(
      { name: getRandomIngredient(proteins) },
      { name: getRandomIngredient(carbs) },
      { name: getRandomIngredient(vegs) },
      { name: getRandomIngredient(vegs) },
      { name: getRandomIngredient(vegs) }
    );
    console.log("dinner is served:", ingredients);
    setDinnerIngredients(ingredients);

    setDinner({
      name: `${ingredients[0].name} with ${ingredients[1].name} and Fresh Vegetable Medley`,
      ingredients: ingredients,
      instructions: "",
      imageUrl: "",
      cookingTime: 0,
      categories: [],
      difficulty: "Easy",
      url: "",
      tags: ["Auto Generated", "Simple Meal"],
      userOwner: userOwnerId,
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <p>
        Generate a random recipe containing one protein, one carb and three
        vegetables.
      </p>
      <button className={styles.addButton} onClick={makeDinner}>
        <Sparkles className={styles.icon} />
        Generate Recipe
      </button>
      {dinner.name && <h3>{dinner.name}</h3>}
      {dinnerIngredients && dinnerIngredients.length > 0 && (
        <>
          <ul>
            {dinnerIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
          <button onClick={() => saveRecipe(dinner)}>Save Recipe</button>
        </>
      )}
    </div>
  );
}

export default RandomRecipeGenerator;
