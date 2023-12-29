import React, { useEffect, useState } from "react";
import styles from "../../recipes.module.css";
import { ingredients } from "../../../../../data/ingredients";
import { Sparkles, Save } from "lucide-react";

function RandomRecipeGenerator({ saveRecipe, userOwnerId }) {
  const { carbs, proteins, vegs } = ingredients;
  const [dinner, setDinner] = useState({});
  const [dinnerIngredients, setDinnerIngredients] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function generateImage() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_SERVER_URL}/openAiApi/generateImage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `A plate of food with ${dinner.name}`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const imageData = await response.json();

      return imageData.imageUrl;
    } catch (error) {
      console.error("Error generating image:", error);
    }
  }

  async function generateRecipeInstructions() {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_SERVER_URL
        }/openAiApi/generateRecipeInstructions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: `Recipe name: ${
              dinner.name
            }. Ingredients: ${dinner.ingredients.join(", ")}. Instructions:`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const recipeInstructions = await response.json();

      return recipeInstructions;
    } catch (error) {
      console.error("Error generating recipe instructions:", error);
    }
  }

  const getRandomIngredient = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  };

  useEffect(() => {
    const fetchGenerations = async () => {
      setLoading(true);

      const imageUrl = await generateImage();
      const recipeInstructions = await generateRecipeInstructions();
      console.log("recipeInstructions", recipeInstructions);
      const instructionsArray = JSON.parse(
        recipeInstructions.recipeInstructions
      );

      setDinner((prevDinner) => ({
        ...prevDinner,
        imageUrl: imageUrl,
        instructions: instructionsArray,
      }));

      setDataLoaded(true);
      setLoading(false);
    };

    if (dinner.name && !dataLoaded) {
      fetchGenerations();
    }
  }, [dinner, dataLoaded]);

  const makeDinner = () => {
    const ingredients = [];
    const selectedVegs = [];
    const remainingVegs = [...vegs];

    // Add 1 protein and 1 carb
    ingredients.push(
      { name: getRandomIngredient(proteins) },
      { name: getRandomIngredient(carbs) }
    );

    // Select 3 different vegetables
    for (let i = 0; i < 3; i++) {
      const randomVeg = getRandomIngredient(remainingVegs);
      selectedVegs.push({ name: randomVeg });
      // Remove the selected vegetable from the copy to avoid duplicates
      remainingVegs.splice(remainingVegs.indexOf(randomVeg), 1);
    }

    // Add vegetables
    ingredients.push(...selectedVegs);

    setDinnerIngredients(ingredients);

    setDinner({
      name: `${ingredients[0].name} with ${ingredients[1].name} & ${ingredients[2].name}, ${ingredients[3].name} and ${ingredients[4].name}`,
      ingredients: ingredients,
      instructions: "",
      imageUrl: "",
      cookingTime: 0,
      categories: [],
      difficulty: "Easy",
      tags: ["Auto Generated", "Simple Meal"],
      userOwner: userOwnerId,
    });
  };

  if (dataLoaded && dinner.imageUrl) console.log("dinner", dinner);

  return (
    <div className="flex flex-col gap-2">
      <p>
        Generate a random recipe containing one protein, one carb and three
        vegetables.
      </p>
      {!loading && (
        <button className={styles.addButton} onClick={makeDinner}>
          <Sparkles className={styles.icon} />
          {dinner.name ? "Generate another Recipe" : "Generate Recipe"}
        </button>
      )}

      {loading && <p>Loading...</p>}

      {dataLoaded && dinner.imageUrl && (
        <div className={styles.recipeCard}>
          {dinner.imageUrl && (
            <div className={styles.imageContainer}>
              <img
                className={styles.recipeImage}
                src={dinner.imageUrl}
                alt={dinner.name}
              />
            </div>
          )}

          <div className={styles.recipeDetails}>
            {dinner.name && (
              <h3 className={styles.recipeName}>{dinner.name}</h3>
            )}
            <div className={styles.recipeTags}>
              <ul>
                {dinner.tags.map((tag, index) => (
                  <li key={index}>{tag}</li>
                ))}
                {dinner.categories.map((category, index) => (
                  <li key={index}>{category}</li>
                ))}
              </ul>
            </div>

            {dinnerIngredients && dinnerIngredients.length > 0 && (
              <>
                <div className={styles.recipeIngredients}>
                  <h4>Ingredients:</h4>
                  <ol>
                    {dinnerIngredients.map((ingredient, index) => (
                      <li key={index}>{ingredient.name}</li>
                    ))}
                  </ol>
                </div>
              </>
            )}

            <div className={styles.recipeInstructions}>
              <h4>Instructions:</h4>
              {dinner.instructions && dinner.instructions.length > 0 ? (
                <ol>
                  {dinner.instructions.map((step, index) => (
                    <li key={index}>{step.step}</li>
                  ))}
                </ol>
              ) : (
                <p>
                  <em>Coming soon...</em>
                </p>
              )}
            </div>

            <button
              onClick={() => saveRecipe(dinner)}
              className="flex align-center gap-2"
            >
              <Save className={styles.icon} />
              Save Recipe
            </button>
          </div>
        </div>
      )}
      {/* recipeCard */}
    </div>
  );
}

export default RandomRecipeGenerator;
