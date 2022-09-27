var userInput = document.querySelector("#user-input");
var form = document.querySelector("#search-form");
var recipeList = document.querySelector(".recipes");
var method = document.getElementById('instructions')
var modal = document.getElementById("myModal");
var nutritionFacts = document.getElementById('Nutrition-facts')
// Get the button that opens the modal
var btn = document.getElementsByClassName("recipe-div");
console.log(btn)

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

const searchRecipe = async () => {
  console.log(userInput.value);
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "8e265fd8demsh64378718b27c8e2p18dd32jsn8767306f5220",
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  };

  const response = await fetch(
    `https://tasty.p.rapidapi.com/recipes/list?from=0&size=5&tags=under_30_minutes&q=${userInput.value}`,
    options
  );

  const json = await response.json();
  let datajson = json.results;
  console.log(json.results);
 let data = datajson.map(
    (result) =>
      `<h4 id="recipe-name">${result.name}</h4>
    <div class="recipe-div" id="recipe-div" nutritionid=${result.id} recipeid=${result.instructions[0].id}><img id="recipe-img" class="recipeName" src="${result.thumbnail_url}" alt="img"/></div>`
  );
  recipeList.innerHTML = data;


  function findNutritionInfo(id) {
    let mdString = "";
    const item = datajson.find((elem) => elem.id == id)
  console.log(item)
    if (item) {
    const container = {};
   console.log(id)
  Object.entries(item.nutrition).filter(([key, value]) => key !== 'updated_at').map(([key, value]) => {
              mdString += `<p>${key}: ${value}</p>`
              })
              nutritionFacts.innerHTML = mdString
              console.log(mdString)
              
    } else {
      return `Product doesnt exists with id ${id}`;
    }

  }


   function findChildren(id) {
    const item = datajson.map((elem) => elem.instructions)
  console.log(item)
    if (item) {
      console.log(id)
      let results = item.find((d)=>d[0].id == id)
      if(results){
      console.log(results)
     let newResults =  results.map((d)=>d.display_text);
      newResults =  newResults.map((i) =>`<li>${i}</li>`)
      console.log(newResults)
      method.innerHTML = newResults
      
    } else {
      return `Product doesnt exists with id ${id}`;
    }

  }
}
  


let statusButton = document.getElementsByClassName("recipe-div");
statusButton = Array.from(statusButton);
statusButton.forEach((b) =>b.addEventListener("click", (event) => {
    event.preventDefault();
    modal.style.display = "block"
    const recipeId = b.getAttribute("recipeid");
    const nutritionId = b.getAttribute('nutritionid');
    findNutritionInfo(nutritionId)
    findChildren(recipeId);
    console.log(recipeId)
    console.log(nutritionId)
  })
)
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

};

form.addEventListener("submit", function (event) {
  event.preventDefault();
  // console.log("got here");
  searchRecipe();
});




