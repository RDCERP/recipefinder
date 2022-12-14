var userInput = document.querySelector("#user-input"); // User inputs an ingredient
var form = document.querySelector("#search-form");
var recipeList = document.querySelector(".recipes"); // List of recipes
var method = document.getElementById("instructions"); // Instructions for recipe
var modal = document.getElementById("myModal"); // Modal
var nutritionFacts = document.getElementById("Nutrition-facts"); // Nutrition facts
var btn = document.getElementsByClassName("recipe-div");
var recipeEl = document.querySelector(".recipes"); // When the user clicks on the button, open the modal

var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal

const searchRecipe = async () => {
  // Search for recipes
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2830944460mshe36eaef80fe9dcfp11c088jsnc76463ac7bd7",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  const response = await fetch(
    // Fetching the data from the API
    `https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&tags=under_30_minutes&q=${userInput.value}`,
    options
  );

  const json = await response.json(); // Converting the data to JSON
  let datajson = json.results; // Getting the results from the JSON
  let data = datajson.map(
    // Mapping the results
    (result) =>
      `
    <div class="recipe-div" id="recipe-div" nutritionid=${result.id} recipeid=${result.instructions[0].id}><h4 id="recipe-name">${result.name}</h4><img id="recipe-img" class="recipeName" src="${result.thumbnail_url}" alt="img"/></div>`
  );
  recipeList.innerHTML = data.join(""); // Displaying the results
  function findNutritionInfo(id) {
    // Function to find nutrition info
    let mdString = ""; // Empty string
    const item = datajson.find((elem) => elem.id == id); // Finding the nutrition info
    if (item) {
      // If the item exists
      const container = {}; // Empty object
      Object.entries(item.nutrition)
        .filter(([key, value]) => key !== "updated_at")
        .map(([key, value]) => {
          // Filtering the nutrition info
          mdString += `<p>${key}: ${value}</p>`; // Adding the nutrition info to the string
        });
      nutritionFacts.innerHTML = mdString; // Displaying the nutrition info
    } else {
      // If the item does not exist
      return `Product doesnt exists with id ${id}`; // Return this message
    }
  }

  function findChildren(id) {
    // Function to find the children
    const item = datajson.map((elem) => elem.instructions); // Finding the children
    if (item) {
      // If the item exists
      let results = item.find((d) => d[0].id == id); // Finding the children
      if (results) {
        // If the results exist
        let newResults = results.map((d) => d.display_text); // Mapping the results
        newResults = newResults.map((i) => `<li>${i}</li>`); // Mapping the results
        method.innerHTML = newResults; // Displaying the results
      } else {
        // If the results do not exist
        return `Product doesnt exists with id ${id}`; // Return this message
      }
    }
  }

  let statusButton = document.getElementsByClassName("recipe-div"); // Getting the recipe div
  statusButton = Array.from(statusButton); // Converting the recipe div to an array
  statusButton.forEach((b) =>
    b.addEventListener("click", (event) => {
      // Adding an event listener to the recipe div
      event.preventDefault(); // Preventing the default action
      modal.style.display = "block"; // Displaying the modal
      const recipeId = b.getAttribute("recipeid"); // Getting the recipe id
      const nutritionId = b.getAttribute("nutritionid"); // Getting the nutrition id
      findNutritionInfo(nutritionId); // Calling the function to find the nutrition info
      findChildren(recipeId); // Calling the function to find the children
    })
  );

  span.onclick = function () {
    // When the user clicks on the span (X)
    modal.style.display = "none"; // Close the modal
  };

  window.onclick = function (event) {
    // When the user clicks anywhere outside of the modal
    if (event.target == modal) {
      // If the user clicks outside of the modal
      modal.style.display = "none"; // Close the modal
    }
  };
};

form.addEventListener("submit", function (event) {
  // Adding an event listener to the form
  event.preventDefault(); // Preventing the default action
  searchRecipe(); // Calling the function to search for recipes
});

var url = "https://www.themealdb.com/api/json/v1/1/random.php";
const blah = document.querySelector("#data");

blah.addEventListener("click", () => {
  $.getJSON(url, function (data) {
    var output = data.meals;

    for (var i = 0; i < output.length; i++) {
      display.innerHTML = `<img src="${output[i].strMealThumb}" alt="${output[i].strMeal}"> <br>
        ${output[i].strMeal} <br>
        Category:  ${output[i].strCategory} <br>
        Source: <a href="${output[i].strSource}">${output[i].strSource}</a>`;
    }
  });
});
