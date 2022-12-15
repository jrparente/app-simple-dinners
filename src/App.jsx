import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Dinners from "./components/Dinners";
import Ingredients from "./components/Ingredients";
import ShoppingList from "./components/ShoppingList";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  const [menus, setMenus] = useState(
    JSON.parse(localStorage.getItem("menus")) || []
  );
  const [currentDinnerID, setCurrentDinnerID] = useState(
    (menus[0] && menus[0].id) || ""
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const [showSidebar, setShowSidebar] = useState(isMobile && menus.length > 0);
  const [showToggle, setShowToggle] = useState(isMobile && menus.length > 0);

  // Check Window size to apply/remove Responsive Layout and functionalities to components
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 700;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  useEffect(() => {
    setShowSidebar(menus.length > 1 ? true : false);
  }, [menus.length, isMobile]);

  useEffect(() => {
    setShowToggle(isMobile & (menus.length > 0) ? true : false);
  }, [menus.length, isMobile]);

  // Change Sidebar visibility on button click in Mobile
  function changeShow() {
    setShowSidebar((prevShow) => !prevShow);
  }

  // Generate random ingredient
  function randomIngredient(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  // Create a simple plate with 5 ingredients: 1 protein + 1 carb + 3 veg
  function makeDinner(proteins, carbs, vegs) {
    return [
      randomIngredient(proteins),
      randomIngredient(carbs),
      randomIngredient(vegs),
      randomIngredient(vegs),
      randomIngredient(vegs),
    ];
  }

  // Generate one random Meal from the bigMeals Array of objects
  function randomBigMeal(bigMeals) {
    const randomNumber = Math.floor(Math.random() * bigMeals.length);

    return {
      name: [bigMeals[randomNumber].name],
      ingredients: [bigMeals[randomNumber].ingredients],
    };
  }

  // Create 5 dinners: 4 simple plates + 1 big meal
  function createNewMeal() {
    const newMenu = {
      id: nanoid(),
      menu: [
        makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
        makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
        makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
        makeDinner(Ingredients.proteins, Ingredients.carbs, Ingredients.vegs),
        randomBigMeal(Ingredients.bigMeals),
      ],
    };

    setMenus((prevMenus) => [newMenu, ...prevMenus]);
    setCurrentDinnerID(newMenu.id);
  }

  // Find the current Meal, in order to
  // display the correct dinners and shopping list
  function findCurrentMeal() {
    return (
      menus.find((menu) => {
        return menu.id === currentDinnerID;
      }) || menus[0]
    );
  }

  // Save menu to local storage
  useEffect(() => {
    localStorage.setItem("menus", JSON.stringify(menus));
  }, [menus]);

  // Change Displayed Dinner
  function changeDisplayedDinner(props) {
    setCurrentDinnerID(props);
  }

  // Delete all from local Storage
  function clearLocalStorage() {
    localStorage.clear();
    setMenus([]);
  }

  // one specific menu when trahs icon for that menu
  // is clicked on the sidebar
  function deleteMenu(event, menuId) {
    event.stopPropagation();
    const newMenuList = menus.filter((menu) => menu.id !== menuId);
    setMenus(newMenuList);
  }

  // RENDER APP
  return (
    <div className="App container flex">
      {menus.length > 0 && (
        <Sidebar
          dinners={menus}
          changeDisplayedDinner={changeDisplayedDinner}
          clearLocalStorage={clearLocalStorage}
          currentDinnerID={currentDinnerID}
          deleteMenu={deleteMenu}
          showSidebar={showSidebar}
        />
      )}

      <main className="main">
        <Header
          createNewMeal={createNewMeal}
          menu={menus}
          isMobile={isMobile}
          showToggle={showToggle}
          changeShow={changeShow}
          showSidebar={showSidebar}
        />

        {menus.length > 0 && (
          <>
            <Dinners currentMenu={findCurrentMeal()} />

            <ShoppingList currentMenu={findCurrentMeal()} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
