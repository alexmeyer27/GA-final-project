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
	 		console.log(result);
	 	},
	 	error: function() {
			alert("Error - api call unsuccessful. Check console");
		}
	})
}

recipeSearch();

//success function creates object and inserts as html (to be created)


//link to bookmark button that adds to firebase database


//ability to manually add recipe by url (less information when adding this way)


//selecting recipe book expands section of the page to show bookmarked recipes


//recipes are returned sorted alphabetically

