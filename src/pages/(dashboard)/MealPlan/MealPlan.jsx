import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Recipes/_components/RecipeCard/RecipeCard";
import { useCookies } from "react-cookie";

function MealPlan() {
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const [savedRecipes, setSavedRecipes] = useState([]);

  const updateSavedRecipes = (newSavedRecipes) => {
    setSavedRecipes(newSavedRecipes);
  };

  const removeDeletedRecipe = (recipeID) => {
    setSavedRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe._id !== recipeID)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${origin}/recipes/savedRecipes/${userID}`,
          {
            headers: { authorization: cookies.access_token },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch data.");
        }

        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [userID]);

  return (
    <div className="container">
      <h2>Meal Plan</h2>
      {savedRecipes && savedRecipes.length > 0 ? (
        savedRecipes
          .reverse()
          .map((recipe, index) => (
            <RecipeCard
              key={index}
              recipe={recipe}
              isRecipeSaved={true}
              updateSavedRecipes={updateSavedRecipes}
              removeDeletedRecipe={removeDeletedRecipe}
            />
          ))
      ) : (
        <p>No recipes yet.</p>
      )}
    </div>
  );
}

export default MealPlan;
