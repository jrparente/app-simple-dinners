import React from "react";
import styles from "../../recipes.module.css";
import { Trash, PlusCircle } from "lucide-react";

function AddNewRecipeForm({ handleSubmit, recipeData, setRecipeData, error }) {
  const handleIngredientChange = (event, index) => {
    const newIngredients = [...recipeData.ingredients];
    newIngredients[index][event.target.name] = event.target.value;
    setRecipeData({ ...recipeData, ingredients: newIngredients });
  };

  const handleAddItem = (type) => {
    const newItem =
      type === "ingredients" ? { name: "", quantity: "", unit: "" } : "";
    setRecipeData({
      ...recipeData,
      [type]: [...recipeData[type], newItem],
    });
  };

  const handleRemoveItem = (type, index) => {
    const updatedItems = [...recipeData[type]];
    updatedItems.splice(index, 1);
    setRecipeData({ ...recipeData, [type]: updatedItems });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="name">Recipe name: </label>
        <input
          type="text"
          id="name"
          placeholder="Recipe Name"
          value={recipeData.name}
          onChange={(e) =>
            setRecipeData({ ...recipeData, name: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label>Ingredients:</label>

        {recipeData.ingredients.map((ingredient, index) => (
          <div className={styles.ingredientItem} key={index}>
            {index >= 0 && (
              <div className={styles.ingredientInputs}>
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <input
                  type="text"
                  name="unit"
                  placeholder="Unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("ingredients", index)}
                  className={styles.removeButton}
                >
                  <Trash className={styles.icon} />
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("ingredients")}
          className={styles.addButton}
        >
          <PlusCircle className={styles.icon} />
          Add Ingredient
        </button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="instructions">Instructions: </label>
        {recipeData.instructions.map((instruction, index) => (
          <div className={styles.ingredientItem} key={index}>
            {index >= 0 && (
              <div className={styles.ingredientInputs}>
                <input
                  type="text"
                  placeholder="Instruction"
                  value={instruction}
                  onChange={(e) => {
                    const newInstruction = [...recipeData.instructions];
                    newInstruction[index] = e.target.value;
                    setRecipeData({
                      ...recipeData,
                      instructions: newInstruction,
                    });
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("instructions", index)}
                  className={styles.removeButton}
                >
                  <Trash />
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("instructions")}
          className={styles.addButton}
        >
          <PlusCircle className={styles.icon} />
          Add Instruction Step
        </button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="image">Image URL: </label>
        <input
          type="text"
          id="image"
          placeholder="URL for the recipe image"
          value={recipeData.imageUrl}
          onChange={(e) =>
            setRecipeData({ ...recipeData, imageUrl: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="cookingTime">Cooking Time (minutes): </label>
        <input
          type="number"
          id="cookingTime"
          placeholder="Cooking Time in minutes"
          value={recipeData.cookingTime}
          onChange={(e) =>
            setRecipeData({ ...recipeData, cookingTime: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="difficulty">Difficulty: </label>
        <input
          type="text"
          id="difficulty"
          placeholder="Recipe Difficulty"
          value={recipeData.difficulty}
          onChange={(e) =>
            setRecipeData({ ...recipeData, difficulty: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="url">Recipe URL: </label>
        <input
          type="text"
          id="url"
          placeholder="URL for the full recipe"
          value={recipeData.url}
          onChange={(e) =>
            setRecipeData({ ...recipeData, url: e.target.value })
          }
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tags">Tags:</label>
        {recipeData.tags.map((tag, index) => (
          <div className={styles.ingredientItem} key={index}>
            {index >= 0 && (
              <div className={styles.ingredientInputs}>
                <input
                  type="text"
                  placeholder="Tag"
                  value={tag}
                  onChange={(e) => {
                    const newTags = [...recipeData.tags];
                    newTags[index] = e.target.value;
                    setRecipeData({ ...recipeData, tags: newTags });
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("tags", index)}
                  className={styles.removeButton}
                >
                  <Trash />
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("tags")}
          className={styles.addButton}
        >
          <PlusCircle className={styles.icon} />
          Add Tag
        </button>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="categories">Categories:</label>
        {recipeData.categories.map((category, index) => (
          <div className={styles.ingredientItem} key={index}>
            {index >= 0 && (
              <div className={styles.ingredientInputs}>
                <input
                  type="text"
                  placeholder="Category"
                  value={category}
                  onChange={(e) => {
                    const newCategories = [...recipeData.categories];
                    newCategories[index] = e.target.value;
                    setRecipeData({
                      ...recipeData,
                      categories: newCategories,
                    });
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem("categories", index)}
                  className={styles.removeButton}
                >
                  <Trash />
                </button>
              </div>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => handleAddItem("categories")}
          className={styles.addButton}
        >
          <PlusCircle className={styles.icon} />
          Add Category
        </button>
      </div>

      <div className={styles.formGroup}>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit">Save Recipe</button>
      </div>
    </form>
  );
}

export default AddNewRecipeForm;
