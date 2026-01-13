'use strict';

const cakeRecipes = require("./cake-recipes.json");

// ==== PURE FUNCTIONS ====

/*
1. Function to Get Unique Authors
Uses .forEach
*/
const getAllAuthors = (recipes) => {
  const authors = [];
  recipes.forEach(({ Author }) => {
    if (!authors.includes(Author)) authors.push(Author);
  });
  return authors;
};

/*
2 & 3. Function to Log Recipe Names
Uses object destructuring
*/
const printRecipeNames = (recipes) => {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ Name }) => console.log(Name));
};

/*
4 & 5. Function to Get Recipes by Author
NOW case-insensitive
Uses .filter
*/
const getRecipesByAuthor = (recipes, author) => {
  const search = author.toLowerCase();

  return recipes.filter(recipe =>
    recipe.Author.toLowerCase() === search
  );
};

/*
6 & 7. Function to Get Recipes by Ingredient
NOW case-insensitive + partial match
Uses .filter and .some
*/
const getRecipesByIngredient = (recipes, ingredient) => {
  const search = ingredient.toLowerCase();

  return recipes.filter(recipe =>
    recipe.Ingredients.some(item =>
      item.toLowerCase().includes(search)
    )
  );
};

/*
8 & 9. Function to Get Recipe by Name
Uses .find and .includes
*/
const getRecipeByName = (recipes, name) => {
  const search = name.toLowerCase();

  const found = recipes.find(recipe =>
    recipe.Name.toLowerCase().includes(search)
  );

  return found || null;
};

/*
10 & 11. Function to Get All Ingredients
Uses .reduce
*/
const getAllIngredients = (recipes) => {
  return recipes.reduce(
    (allIngredients, recipe) =>
      allIngredients.concat(recipe.Ingredients),
    []
  );
};

// --- APPLICATION STATE ---
let savedRecipes = [];


// Part 2

const displayMenu = () => {
  console.log("\nRecipe Management System Menu:");
  console.log("1. Show All Authors");
  console.log("2. Show Recipe names by Author");
  console.log("3. Show Recipe names by Ingredient");
  console.log("4. Get Recipe by Name");
  console.log("5. Get All Ingredients of Saved Recipes");
  console.log("0. Exit");
  const choice = prompt("Enter a number (1-5) or 0 to exit: ");
  return parseInt(choice);
};


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1: { // Show All Authors
      const authors = getAllAuthors(cakeRecipes);
      console.log("Authors:");
      authors.forEach(author => console.log(author));
      break;
    }

    case 2: { // Show Recipe Names by Author
      const author = prompt("Enter author name:");
      const recipes = getRecipesByAuthor(cakeRecipes, author);
      printRecipeNames(recipes);
      break;
    }

    case 3: { // Show Recipe Names by Ingredient
      const ingredient = prompt("Enter ingredient:");
      const recipes = getRecipesByIngredient(cakeRecipes, ingredient);
      printRecipeNames(recipes);
      break;
    }

    case 4: { // Get Recipe by Name
      const name = prompt("Enter recipe name:");
      const recipe = getRecipeByName(cakeRecipes, name);

      if (!recipe) {
        console.log("Recipe not found.");
        break;
      }

      console.log("Recipe found:");
      console.log(recipe);

      const save = prompt("Save this recipe? (yes/no)");
      if (save.toLowerCase() === "yes") {
        savedRecipes.push(recipe);
        console.log("Recipe saved.");
      }
      break;
    }

    case 5: { // Get All Ingredients of Saved Recipes
      if (savedRecipes.length === 0) {
        console.log("No saved recipes.");
        break;
      }

      const ingredients = getAllIngredients(savedRecipes);
      console.log("Ingredients from saved recipes:");
      ingredients.forEach(ingredient => console.log(ingredient));
      break;
    }

    case 0:
      console.log("Exiting...");
      break;

    default:
      console.log("Invalid input. Please enter a number between 0 and 5.");
  }
} while (choice !== 0);
