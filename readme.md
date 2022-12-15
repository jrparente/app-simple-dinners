# Simple Meals

A simple app to help get dinner ideas and generate shopping lists.

Although there are many of these apps already out there, I find thatthe dinner ideas are not "simple" enough. I wanted something that would generate ideas for dinners with 1 protein, 1 carb and 3 vegs. Also, it includes one more "complicated" meal option per menu.

The app also generates a Shopping List for each Menu generated, and saves the generated menus in local storage.

## Features

- [x] Store ingredients in arrays

- [x] Select Random ingredients from a meal

- [x] Add and select entire meals alongside random ingredients

- [ ] Select varied proteins for the menu (prevent eating same protein type on all meals)

- [x] Generate a shopping list from all the required produce

- [x] Render results in the DOM

- [x] Create separate components for each reusable part of the code: ingredients data ✅, individual dinners ✅, shopping list ✅

- [x] Save Generated Menus to Local Storage (and load them on refresh)

- [x] Sidebar with all Menus saved in local storage. On click it displays the selected menu and ingredients for that menu.

- [x] Ability to clear local storage

- [x] Ability to delete selected Menus from the sidebar

## Roadmap

### 🚨 Fix Bugs

- [ ] 🪳 Need to prevent duplicate vegs on the makedinner()

- [ ] 🪳 Problem with sidebar on mobile: when the user does not have anything stored in local storage, and generates the first meal on Mobile, the sidebar immediately appears (it shouldn't. It should just appear the button to toggle it), and it's pushed to the right side of the screen, instead of the left.

### Short / Medium term features:

- [x] Work on Mobile version (maybe toggle sidebar with a hamburguer icon?)

- [ ] Ability to choose number of dinners to generate

- [ ] Ability for the user to insert the number of persons in household, and multiply the shopping list by that number of persons (the shoppigng list is currently per portion)

- [ ] Ability for the user to add ingredients and big meals to the Ingredients data (ie: most used ingredients in a household)

- [ ] Add cooking method (ie: steemed whitefish, grilled tuna steak, boiled eggs) And maybe prefered cooking methods for each ingredient?

- [ ] Add images to ingredients?

- [ ] Ability to Switch out ingredients in a menu

- [ ] Ability to print, share or save Shopping List to notes or tasks app

### Long term features:

- [ ] Light/dark mode toggle, in addition to the @media (prefers-color-scheme: light) in the CSS file

- [ ] Ability to store information in a database
