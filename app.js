const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const recipesContainer = document.getElementById("recipes-container");
const randomButton = document.getElementById("random-button");
const quoute=document.getElementById("quote-section");

let currentQuery = "";

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    fetchRecipes(query);
  } else {
    alert("Please enter an ingredient.");
  }
});

async function fetchRecipes(query) {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }
    const data = await response.json();
    if (data.meals) {
      displayRecipes(data.meals);
    } else {
      recipesContainer.innerHTML = "<p>No recipes found.</p>";
    }
  } catch (error) {
    console.error(error);
    alert("Could not fetch recipes. Please try again.");
  }
}

function displayRecipes(recipes) {
    quoute.remove();
  recipesContainer.innerHTML = "";
  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <h3>${recipe.strMeal}</h3>
            <button class="details-button" data-id="${recipe.idMeal}">View Recipe</button>
        `;

    recipesContainer.appendChild(recipeCard);
  });

  // Add event listeners to "View Recipe" buttons
  document.querySelectorAll(".details-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      const recipeId = event.target.getAttribute("data-id");
      window.location.href = `recipe-details.html?id=${recipeId}`;
    });
  });
}

//Event listener for Random Recipe button.
randomButton.addEventListener("click", async () => {
  const apiUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch random recipe");
    }
    const data = await response.json();
    displayRecipes(data.meals);
  } catch (error) {
    console.error(error);
    alert("Could not fetch random recipe. Please try again.");
  }
});
