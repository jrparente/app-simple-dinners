import React, { useState } from "react";
import styles from "./recipecard.module.css";
import {
  Clock,
  Gauge,
  MoreHorizontal,
  Pencil,
  Pin,
  PinOff,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";

function RecipeCard({ recipe, saveRecipe, isRecipeSaved }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.recipeCard}>
      <div className={styles.recipeMenu}>
        <div
          className={styles.recipeMenuButton}
          role="button"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <MoreHorizontal />
        </div>

        {showMenu && (
          <ul className={styles.recipeMenuOptions}>
            {!!saveRecipe && !isRecipeSaved && (
              <li
                className={styles.recipeMenuOptionsItem}
                role="button"
                onClick={() => saveRecipe(recipe._id)}
              >
                <Pin style={{ width: "18px", height: "18px" }} /> Save Recipe
              </li>
            )}
            {isRecipeSaved && (
              <li
                className={styles.recipeMenuOptionsItem}
                role="button"
                onClick={() => {}}
              >
                <PinOff style={{ width: "18px", height: "18px" }} /> Unsave
                Recipe
              </li>
            )}
            <li className={styles.recipeMenuOptionsItem} role="button">
              <Pencil style={{ width: "18px", height: "18px" }} /> Edit Recipe
            </li>
            <li className={styles.recipeMenuOptionsItem} role="button">
              <Trash style={{ width: "18px", height: "18px" }} /> Delete Recipe
            </li>
          </ul>
        )}
      </div>

      <div className={styles.imageContainer}>
        <Link to={`/recipe/${recipe._id}`}>
          <img
            src={recipe.imageUrl || "recipe-image-placeholder.jpg"}
            alt={recipe.name}
            className={styles.recipeImage}
          />
        </Link>
      </div>

      <div className={styles.recipeDetails}>
        <h3 className={styles.recipeName}>{recipe.name}</h3>
        <div className={styles.recipeMeta}>
          {recipe.cookingTime > 0 && (
            <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Clock style={{ width: "1rem", height: "1rem" }} />
              {recipe.cookingTime} minutes
            </p>
          )}
          {!!recipe.difficulty && (
            <p style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <Gauge style={{ width: "1rem", height: "1rem" }} />
              {recipe.difficulty}
            </p>
          )}
        </div>
        <div className={styles.recipeIngredients}>
          <h4>Ingredients:</h4>
          <ul>
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
        {recipe.tags && recipe.tags.length > 0 && (
          <div className={styles.recipeTags}>
            <ul>
              {recipe.tags.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
              {recipe.categories.map((category, index) => (
                <li key={index}>{category}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
