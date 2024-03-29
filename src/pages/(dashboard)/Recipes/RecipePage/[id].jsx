import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "./RecipePage.module.css";

import { Clock, Gauge } from "lucide-react";

function RecipePage() {
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const [cookies, _] = useCookies(["access_token"]);
  const params = useParams();
  const recipeId = params.recipeId;
  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${origin}/recipes/recipe/${recipeId}`,
          {
            headers: { authorization: cookies.access_token },
          }
        );

        setRecipe(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          {recipe ? (
            <>
              <h2>{recipe.name}</h2>
              <div className={styles.recipeDetails}>
                <div className={styles.imageContainer}>
                  <img
                    src={recipe.imageUrl || "../recipe-image-placeholder.jpg"}
                    alt={recipe.name}
                    className={styles.recipeImage}
                  />
                </div>
                <div className={styles.recipeInfo}>
                  <div className={styles.recipeMeta}>
                    {recipe.cookingTime > 0 && (
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Clock style={{ width: "1rem", height: "1rem" }} />
                        {recipe.cookingTime} minutes
                      </p>
                    )}
                    {!!recipe.difficulty && (
                      <p
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Gauge style={{ width: "1rem", height: "1rem" }} />
                        {recipe.difficulty}
                      </p>
                    )}
                  </div>

                  <div className={styles.ingredientsList}>
                    <h2>Ingredients:</h2>
                    {recipe.ingredients.map((ingredient, index) => (
                      <div
                        key={ingredient._id}
                        className={styles.ingredientsItem}
                      >
                        <strong>{ingredient.name}</strong>
                        {ingredient.quantity && (
                          <span>
                            : {ingredient.quantity} {ingredient.unit}
                          </span>
                        )}
                      </div>
                    ))}
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
              {recipe.instructions && (
                <div className={styles.instructions}>
                  <h2>Instructions:</h2>
                  <p>{recipe.instructions}</p>
                </div>
              )}
              <div className="flex gap-2 flex-wrap my-5">
                <button>Edit Recipe</button>
                <button>Delete Recipe</button>
              </div>
            </>
          ) : (
            <Loading />
          )}
        </div>
      )}
    </>
  );
}

export default RecipePage;
