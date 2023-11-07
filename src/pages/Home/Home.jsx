import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../Recipes/_components/RecipeCard/RecipeCard";
import Loading from "../../components/Loading/Loading";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import styles from "./home.module.css";

function Home() {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookies, _] = useCookies(["access_token"]);
  const userID = window.localStorage.getItem("userID");
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isRecipeSaved = (id) => {
    return savedRecipes.some((recipe) => recipe._id === id);
  };

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        `${origin}/recipes`,
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
      navigate("/meal-plan");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${origin}/recipes/${userID}`, {
          headers: { authorization: cookies.access_token },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch data.");
        }

        setRecipes(response.data);

        let uniqueCategories = [];
        recipes.forEach((recipe) => {
          recipe.categories.forEach((category) => {
            uniqueCategories.push(category);
          });
          // recipe.tags.forEach((tag) => {
          //   uniqueCategories.push(tag);
          // });
        });

        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (userID) {
      fetchData();
    } else {
      setRecipes([]);
    }
  }, [userID]);

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
      } finally {
        setIsLoading(false);
      }
    };
    if (userID) fetchData();
  }, []);

  useEffect(() => {
    setFilteredRecipes(recipes);
  }, [recipes]);

  useEffect(() => {
    if (selected) {
      const newRecipes = recipes.filter((recipe) =>
        recipe.categories.includes(selected)
      );
      setFilteredRecipes(newRecipes);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [selected]);

  return (
    <div className="container">
      {isLoading && userID ? (
        <Loading />
      ) : filteredRecipes && filteredRecipes.length > 0 ? (
        <>
          <div className="flex w-full justify-between align-center">
            <h2>Your Recipes</h2>

            {categories && categories.length > 0 && (
              <div className="flex">
                <select onChange={(e) => setSelected(e.target.value)}>
                  <option value="">Filter by Categories</option>

                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {filteredRecipes.map((recipe, index) => {
            const isSaved = isRecipeSaved(recipe._id);

            return (
              <RecipeCard
                key={index}
                recipe={recipe}
                saveRecipe={saveRecipe}
                isRecipeSaved={isSaved}
              />
            );
          })}
        </>
      ) : userID ? (
        <section className={styles.heroContainer}>
          <div className={styles.content}>
            <h2>Welcome to the Meal Plan Generator!</h2>
            <p>
              Your personalized recipe and meal planning assistant. Add your
              favorite recipes, generate meal ideas, and create your weekly
              shopping list.
            </p>
            <button role="link" onClick={() => navigate("/create-recipe")}>
              Start Planning
            </button>
          </div>
          <div className={styles.image}>
            <img src="/cooking.svg" alt="Meal Plan Generator" />
          </div>
        </section>
      ) : (
        <section className={styles.heroContainer}>
          <div className={styles.content}>
            <h2>Tired of trying to think about what to have for dinner?</h2>
            <p>
              Start planning your meals with the Meal Plan Generator. Add your
              favorite recipes, generate simple dinner ideas, and create your
              shopping list for the week.
            </p>
            <button role="link" onClick={() => navigate("/auth")}>
              Get Started
            </button>
          </div>
          <div className={styles.image}>
            <img src="/cooking.svg" alt="Meal Plan Generator" />
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
