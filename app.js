//variable
const searchBar = $('#recipe-search'),
      button = $('#submit-button'),
      defaultBookmark = $('.far fa-bookmark'),
      cookbook = $('#cookbook');

var recipeList = $('#cookbook_recipes');

// Initialize Firebase
 var config = {
    apiKey: "AIzaSyBaNtqY99qwGw8UtGlCOkrFrBZNqbO9IWA",
    authDomain: "recipe-project-d634f.firebaseapp.com",
    databaseURL: "https://recipe-project-d634f.firebaseio.com",
    projectId: "recipe-project-d634f",
    storageBucket: "recipe-project-d634f.appspot.com",
    messagingSenderId: "556672499012"
  };

firebase.initializeApp(config);

const database = firebase.database();

var recipeDatabaseReference = firebase.database().ref('recipes');

database.ref('recipes').on('value', function (results) {
  recipeList.html('');
  let recipes = results.val();
  console.log(recipes);
  
  for(var messageID in recipes){
    console.log(messageID);
    console.log(recipes[messageID].recipeHTML);
    
    let bookmarkedRecipe = document.createElement('div'),
         recipeContent = recipes[messageID].recipeHTML;
    
    bookmarkedRecipe.innerHTML = `${recipeContent}`;
    bookmarkedRecipe.setAttribute('data-id', messageID);
    
    recipeList.append(bookmarkedRecipe);
  }
});

// API call using jquery AJAX, promises, functions created in global scope
var recipeSearch = function(searchTerm){
	//jquery ajax call
	$.ajax({
		method: "GET",
		dataType: 'json',
    	contentType: 'json',
    	jsonp: false,
		url: `https://www.food2fork.com/api/search?key=5e10831907c423a1bf607fe78627c48b&q=${searchTerm}`, 
	 	success: function(result) {
			event.preventDefault();
			console.log(result);
			var i;
		//success function creates html and inserts as html (to be created)
		for (i = 0; i < result.recipes.length; i++){

			var recipe = result.recipes[i];

			var	recipeTitle = recipe.title,
				author = recipe.publisher,
				recipeURL = recipe.source_url,
				imageURL = recipe.image_url;
				
			//defining article template
			//ToDo: refactor
			var recipeTemplate = 
			"<div class = 'recipe'><h3>" + recipeTitle + "</h3>" + 
			"<h5>" + author + "</h5>" 
			+ "<a href = " + recipeURL + ">Source</a>" 
			+ "<img src = " + imageURL + ">" 
			+ "<i class='far fa-bookmark' onclick = 'bookmark(this)'></i></div>"; 

				
			//appending each article after the search bar
			$("#recipe_search_form").after(recipeTemplate);
				
			}
		i++
	 	},
	 	error: function() {
			alert("Error - api call unsuccessful. Check console");
		}
	})
}


//submit function to call API
button.click( function (){
	event.preventDefault();
	submitValue = searchBar.val();
	recipeSearch(submitValue);
	searchBar.val('');
});

//link to bookmark button that adds to firebase database
function bookmark(bookmarkElement) { 
   
	//add parent elements to database as key:value pairs

	var parentElementHelper = $(event.target).parent();

	var recipeTitle = parentElementHelper.children("h3"),
		recipeURLHelper = parentElementHelper.children("a"),
		recipeURL = recipeURLHelper.attr("href");

	var recipeHTML = `<a href=${recipeURL}>${recipeTitle.text()}</a>`;

	recipeDatabaseReference.push({
		recipeHTML: recipeHTML
	});

	//change bookmark icon
    $(event.target).after('<i class="fas fa-bookmark"></i>');
    bookmarkElement.remove();

}


//ability to manually add recipe by url (less information when adding this way)
function addRecipeByURL() {

	//input element variables 
	var recipeTitleInput = $("#recipe-add-title"),
		recipeURLInput = $("#recipe-add-url"),
		manualAddButton = $("#add-button");

	//data variables
	var recipeTitle = recipeTitleInput.val(),
		recipeURL = recipeURLInput.val();

	// var recipeHTML = `<a href=${recipeURL}>${recipeTitle}</a>`

	//event listener for button/input
	manualAddButton.click( function (){
		event.preventDefault();
		recipeHTML = `<a href=${recipeURL}>${recipeTitle}</a>`
		recipeDatabaseReference.push({
			recipeHTML: recipeHTML
		})
	});
}

//selecting recipe book expands section of the page to show bookmarked recipes

cookbook.click( function (){
	event.preventDefault();
	
});


//recipes are returned sorted alphabetically




