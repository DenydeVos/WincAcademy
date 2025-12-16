'use strict';

const cakeRecipes = require("./cake-recipes.json");

// PURE FUNCTIONS

// 1. Get unique authors
const getAllAuthors = (recipes) => {
  const authors = [];
  recipes.forEach(({ author }) => {
    if (!authors.includes(author)) authors.push(author);
  });
  return authors;
};

// 2. Print recipe names
const printRecipeNames = (recipes) => {
  if (!recipes || recipes.length === 0) {
    console.log("No recipes found.");
    return;
  }
  recipes.forEach(({ name }) => console.log(name));
};

// 3. Get recipes by author
const getRecipesByAuthor = (recipes, author) => {
  return recipes.filter(recipe => recipe.author === author);
};

// 4. Get recipes by ingredient
const getRecipesByIngredient = (recipes, ingredient) => {
  return recipes.filter(recipe =>
    recipe.ingredients.some(item => item === ingredient)
  );
};

// 5. Get recipe by name
const getRecipeByName = (recipes, name) => {
  const found = recipes.find(recipe =>
    recipe.name.toLowerCase().includes(name.toLowerCase())
  );
  return found || null;
};

// 6. Get all ingredients from a list of recipes
const getAllIngredients = (recipes) => {
  return recipes.reduce(
    (allIngredients, recipe) => allIngredients.concat(recipe.ingredients),
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
}


let choice;

do {
  choice = displayMenu();

  switch (choice) {
    case 1: { // Show all authors
      const authors = getAllAuthors(cakeRecipes);
      console.log("Authors:");
      authors.forEach(author => console.log(author));
      break;
    }

    case 2: { // Show recipes by author
      const author = prompt("Enter author name:");
      const recipes = getRecipesByAuthor(cakeRecipes, author);
      printRecipeNames(recipes);
      break;
    }

    case 3: { // Show recipes by ingredient
      const ingredient = prompt("Enter ingredient:");
      const recipes = getRecipesByIngredient(cakeRecipes, ingredient);
      printRecipeNames(recipes);
      break;
    }

    case 4: { // Get recipe by name
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

    case 5: { // Get all ingredients from saved recipes
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
