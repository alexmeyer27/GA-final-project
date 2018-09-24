//variables
const searchBar = $('#recipe_search_input'),
      button = $('#submit-button'),
      defaultBookmark = $('.far fa-bookmark'),
      cookbook = $('#cookbook'),
      recipeDisplay = $('.recipe_display'),
      edit = $('#edit_cookbook');

var recipeList = $('#cookbook_recipes');

var recipeTitleInput = $("#recipe-add-title"),
	recipeURLInput = $("#recipe-add-url"),
	manualAddButton = $("#add-button");

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

//reference for recipes folder
var recipeDatabaseReference = firebase.database().ref('recipes');

//employing same method as fan page to return bookmarked recipes from the database
database.ref('recipes').on('value', function (results) {
  recipeList.html('');
  let recipes = results.val();
  console.log(recipes);
  
  for(var messageID in recipes){
    
    let bookmarkedRecipe = document.createElement('div'),
        recipeContent = recipes[messageID].recipeHTML;

    bookmarkedRecipe.setAttribute("id", messageID);
    
    bookmarkedRecipe.innerHTML = `${recipeContent}<i class="fas fa-minus-square hidden" onclick = "deleteRecipe(this)"></i>`;
    
    recipeList.append(bookmarkedRecipe);
  }
});

// API call using jquery AJAX
var recipeSearch = function(searchTerm){
	//jquery ajax call - significant difficulty with CORS!
	$.ajax({
		method: "GET",
		dataType: 'json',
    	contentType: 'json',
    	jsonp: false,
		url: `https://www.food2fork.com/api/search?key=5e10831907c423a1bf607fe78627c48b&q=${searchTerm}`, 
	 	success: function(result) {
			event.preventDefault();
			// console.log(result);
			var i;
		//success function creates html and inserts as html (to be created)
		for (i = 0; i < result.recipes.length; i++){

			var recipe = result.recipes[i];

			var	recipeTitle = recipe.title,
				author = recipe.publisher,
				recipeURL = recipe.source_url,
				imageURL = recipe.image_url;
				
			//defining article template
			var recipeTemplate = 
			"<div class = 'recipe'>" + "<a href=" + recipeURL + "><img src = " + imageURL + "></a>" 
			+ "<h3>" + recipeTitle + "</h3>"
			+ "<i class='far fa-bookmark' onclick = 'bookmark(this)'></i>"
			+ "<h5>" + author + "</h5></div>" ; 

				
			//appending each article after the search bar
			$(recipeDisplay).append(recipeTemplate);
				
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
	recipeDisplay.empty();
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
		recipeURL = recipeURLHelper.attr("href"),
		messageID = null;

	var recipeHTML = `<a href=${recipeURL} class = "cookbook_anchors" id = ${messageID}>${recipeTitle.text()}</a>`;

	recipeDatabaseReference.push({
		recipeHTML: recipeHTML
	});

	//change bookmark icon
    $(event.target).after('<i class="fas fa-bookmark"></i>');
    bookmarkElement.remove();

}

//ability to manually add recipe by url
manualAddButton.click( function (){
	event.preventDefault();

	//validation for both forms
	if (recipeTitleInput.val != null && recipeURLInput != null){
		var recipeTitle = recipeTitleInput.val(),
			recipeURL = recipeURLInput.val();
		var recipeHTML = `<a href=${recipeURL}>${recipeTitle}</a>`;
		recipeDatabaseReference.push({
			recipeHTML: recipeHTML
		})
	} else {
		alert("Please enter both a title and URL!")
	}
	recipeTitleInput.val('');
	recipeURLInput.val('');
});


//selecting recipe book expands section of the page to show bookmarked recipes
cookbook.click( function (){
	event.preventDefault();
	recipeList.toggleClass("hidden");
	edit.toggleClass("hidden");
});

//reveal editing
edit.click( function(){
	$(".fas").toggleClass("hidden");
});

var deleteRecipe = function(recipe) {
	$(".fas").click( function(){
		
		//remove element from page
		var parentElementHelper = $(event.target).parent();
		parentElementHelper.remove();

		//remove data from database
		messageID = parentElementHelper.attr("id");

		deletedRecipe =  database.ref('recipes/' + messageID);
      	deletedRecipe.remove();  
});
}




