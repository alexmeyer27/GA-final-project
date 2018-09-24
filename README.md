# GA-final-project
Final project for GA JavaScript course

## How to use this app
There are three pieces of core functionaity in the app.

  1. My Cookbook - select my cookbook at the bottom of the page will reveal previously bookmarked recipes. Each of these recipes is an anchor to the source recipe page. Selecting edit will bring up the option to remove a recipe from the list (both on the page and in the DB).
  
  2. Search Recipe - entering an ingredient or phrase into the search recipe bar with call an API and bring up a list of recipes that matches the query criteria. Searching with a new query will bring up a new list and clear out the old list - clearing the old list was an issue I had both earlier projects.
  
  
  3. Add Recipe/Bookmark Recipe - You can manually add a recipe with a title and url, which will do a simple push to the firebase database and will show up immediately in the cookbook. In addition, selecting the bookmark icon will add that recipe to the db and cookbook as well. So if a recipe is good, it can be saved for later.


## Approach
My approach to this project centered around combining some of the major projects and lessons from the entire course into an app that I could use everyday. The api call, firebase setup and much of the underlying logic were built using previous lessons and projects as a reference, and ultimately this final project served as a good summation of much of what we covered in class.

I attempted to focus primarily on JavaScript functionality over the CSS and HTML. While I am satisfied with the JavaScript, the look and feel of the project could have used some more work. If/when I countinue to refactor this project so I can use it on a day to day, I would change the design pretty dramatically. 

## Things tried + things I would refactor
