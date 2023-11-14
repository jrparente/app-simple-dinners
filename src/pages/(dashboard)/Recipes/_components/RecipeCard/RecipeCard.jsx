import axios from "axios";
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
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

function RecipeCard({
  recipe,
  isRecipeSaved,
  updateSavedRecipes,
  removeDeletedRecipe,
}) {
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const userID = window.localStorage.getItem("userID");
  const [cookies, _] = useCookies(["access_token"]);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${origin}/recipes/save`,
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to save Recipe.");
      }
      console.log(response.data.savedRecipes);
      navigate("/meal-plan");
    } catch (error) {
      console.log(error);
    }
  };

  const unsaveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${origin}/recipes/unsave`,
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to unsave Recipe.");
      }
      console.log(response.data.savedRecipes);
      updateSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRecipe = async (recipeID) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    console.log("confirmDelete", confirmDelete, recipeID);

    if (confirmDelete) {
      try {
        const response = await axios.delete(`${origin}/recipes/${recipeID}`, {
          headers: { authorization: cookies.access_token },
        });
        console.log(response);

        if (response.status !== 200) {
          throw new Error("Failed to delete Recipe.");
        }

        removeDeletedRecipe(recipeID);
      } catch (error) {
        console.log(error);
      }
    }
  };

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
                onClick={() => {
                  saveRecipe(recipe._id);
                  setShowMenu(false);
                }}
              >
                <Pin style={{ width: "18px", height: "18px" }} /> Save Recipe
              </li>
            )}
            {isRecipeSaved && (
              <li
                className={styles.recipeMenuOptionsItem}
                role="button"
                onClick={() => {
                  unsaveRecipe(recipe._id);
                  setShowMenu(false);
                }}
              >
                <PinOff style={{ width: "18px", height: "18px" }} /> Unsave
                Recipe
              </li>
            )}
            <li
              className={styles.recipeMenuOptionsItem}
              role="button"
              onClick={() => {
                setShowMenu(false);
                navigate(`/edit-recipe/${recipe._id}`);
              }}
            >
              <Pencil style={{ width: "18px", height: "18px" }} /> Edit Recipe
            </li>
            <li
              className={styles.recipeMenuOptionsItem}
              role="button"
              onClick={() => {
                deleteRecipe(recipe._id);
                setShowMenu(false);
              }}
            >
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
