
const recipeDetailsContainer = document.getElementById(
    "recipe-details-container"
  );
  const backButton = document.getElementById("back-button");
  
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get("id");
  
  // Fetch recipe details using the recipe ID
  async function fetchRecipeDetails(id) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch recipe details");
      }
      const data = await response.json();
      const recipe = data.meals[0];
  
    // Display recipe details on the page
      recipeDetailsContainer.innerHTML = `
              <h2>${recipe.strMeal}</h2>
              <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
              <h3>Ingredients:</h3>
              <ul>
                  ${generateIngredientsList(recipe)}
              </ul>
              <h3>Instructions:</h3>
              <ol>
                  ${generateInstructionsList(recipe.strInstructions)}
              </ol>
          `;
    } catch (error) {
      console.error(error);
      recipeDetailsContainer.innerHTML =
        "<p>Could not load recipe details. Please try again later.</p>";
    }
  }
  
  // Generate ingredients list from the API response
  function generateIngredientsList(recipe) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`<li>${ingredient} - ${measure}</li>`);
      }
    }
    return ingredients.join("");
  }
  
  // Generate instructions list as ordered steps
  function generateInstructionsList(instructions) {
    const steps = instructions.split(".").filter((step) => step.trim() !== "");
    return steps
      .map((step, index) => {
        return `<li>${step.trim()}</li>`;
      })
      .join("");
  }
  
  fetchRecipeDetails(recipeId);
  
  // Back button logic to navigate properly
  backButton.addEventListener("click", () => {
    const referrer = document.referrer;
  
    if (referrer.includes("index.html")) {
      window.location.href = "index.html";
    } else {
      window.history.back();
    }
  });
  