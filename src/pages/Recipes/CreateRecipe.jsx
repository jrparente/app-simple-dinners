import React, { useState } from "react";
import styles from "./recipes.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import AddNewRecipeForm from "./_components/AddNewRecipeForm/AddNewRecipeForm";
import RandomRecipeGenerator from "./_components/RandomRecipeGenerator/RandomRecipeGenerator";

function CreateRecipe() {
  const navigate = useNavigate();
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const userOwnerId = window.localStorage.getItem("userID");
  const [cookies] = useCookies(["access_token"]);

  const [recipeType, setRecipeType] = useState("manual");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [recipeData, setRecipeData] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    categories: [],
    difficulty: "",
    url: "",
    tags: [],
    userOwner: userOwnerId,
  });

  const saveRecipe = async (recipe) => {
    try {
      await axios.post(`${origin}/recipes`, recipe, {
        headers: { authorization: cookies.access_token },
      });
      setMessage("Recipe created successfully!");
      setError(null);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError("Error creating recipe.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${origin}/recipes`,
        { ...recipeData },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      setMessage("Recipe created successfully!");
      setError(null);
      setRecipeData({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        categories: [],
        difficulty: "",
        url: "",
        tags: [],
        userOwner: userOwnerId,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      setError("Error creating recipe.");
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      {message ? (
        <h2>{message}</h2>
      ) : (
        <>
          <div className="flex w-full gap-4 align-center border-bottom">
            <button
              className={`${styles.tab} ${
                recipeType === "manual" ? styles.activeTab : ""
              }`}
              onClick={() => setRecipeType("manual")}
            >
              Manual Entry
            </button>
            <button
              className={`${styles.tab} ${
                recipeType === "random" ? styles.activeTab : ""
              }`}
              onClick={() => setRecipeType("random")}
            >
              Random Recipe
            </button>
          </div>
          {recipeType === "manual" ? (
            <>
              <h2>Add a new Recipe</h2>
              <AddNewRecipeForm
                handleSubmit={handleSubmit}
                recipeData={recipeData}
                setRecipeData={setRecipeData}
                error={error}
              />
            </>
          ) : recipeType === "random" ? (
            <RandomRecipeGenerator
              saveRecipe={saveRecipe}
              userOwnerId={userOwnerId}
            />
          ) : null}
        </>
      )}
    </div>
  );
}

export default CreateRecipe;
