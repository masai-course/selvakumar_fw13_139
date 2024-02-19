// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://127.0.0.1:${
  import.meta && import.meta.env && import.meta.env.REACT_APP_JSON_SERVER_PORT
    ? import.meta.env.REACT_APP_JSON_SERVER_PORT
    : 9090
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
let mainSection = document.getElementById("data-list-wrapper");
let getRecipesBtn = document.getElementById("fetch-recipes");
let totalResult = document.querySelector(".total-results");
const urlAllRecipes = `${baseServerURL}/recipes`;

let recipesArray = [];

let currentPage = 1;
const limit = 5;

getRecipesBtn.addEventListener('click', fetchRecipes);

function fetchRecipes() {
    const url = `${baseServerURL}/recipes?page=${currentPage}&limit=${limit}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            renderRecipes(data);
            updateTotalResults(data.length);
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

function renderRecipes(recipes) {
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        const recipeImage = document.createElement('img');
        recipeImage.src = recipe.image; // Assuming the image URL is available in the recipe object
        recipeImage.alt = '';

        const recipeDetails = document.createElement('div');
        recipeDetails.classList.add('recipe-details');

        const recipeName = document.createElement('h2');
        recipeName.classList.add('recipe-name');
        recipeName.textContent = recipe.name; // Assuming the recipe name is available in the recipe object

        const recipePrice = document.createElement('p');
        recipePrice.classList.add('recipe-price');
        recipePrice.textContent = recipe.price; // Assuming the recipe price is available in the recipe object

        recipeDetails.appendChild(recipeName);
        recipeDetails.appendChild(recipePrice);

        recipeCard.appendChild(recipeImage);
        recipeCard.appendChild(recipeDetails);

        mainSection.appendChild(recipeCard);
    });
}

function updateTotalResults(count) {
    const totalResultsText = count > 0 ? count : 0;
    totalResult.textContent = totalResultsText;
}

window.addEventListener('scroll', handleScroll);

function handleScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
        currentPage++;
        fetchRecipes();
    }
}