import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import AddNewRecipeForm from "./_components/AddNewRecipeForm/AddNewRecipeForm";
import Loading from "../../components/Loading/Loading";

function EditRecipe() {
  const params = useParams();
  const navigate = useNavigate();
  const recipeId = params.recipeId;
  const [cookies, _] = useCookies(["access_token"]);
  const origin = import.meta.env.VITE_REACT_APP_SERVER_URL || "";
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const updateRecipe = async (updatedRecipe) => {
    try {
      await axios.put(
        `${origin}/recipes`,
        {
          ...updatedRecipe,
          recipeId: recipeId,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      setMessage("Recipe updated successfully!");
      setError(null);

      setTimeout(() => {
        navigate(`/recipe/${recipeId}`);
      }, 2000);
    } catch (error) {
      setError("Error updating recipe.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    updateRecipe(recipe);
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${origin}/recipes/recipe/${recipeId}`,
          {
            headers: { authorization: cookies.access_token },
          }
        );

        if (response.status !== 200) {
          throw new Error("Failed to fetch data.");
        }

        setRecipe(response.data);
      };

      fetchData();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="container">
      {loading ? (
        <Loading />
      ) : message ? (
        <p>{message}</p>
      ) : (
        <>
          <h2>Edit Recipe</h2>
          {recipe && (
            <AddNewRecipeForm
              handleSubmit={handleSubmit}
              recipeData={recipe}
              setRecipeData={setRecipe}
              error={error}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EditRecipe;
