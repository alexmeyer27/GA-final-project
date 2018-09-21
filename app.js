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

recipeSearch("pasta");

//success function creates object and inserts as html (to be created)


//link to bookmark button that adds to firebase database


//ability to manually add recipe by url (less information when adding this way)


//selecting recipe book expands section of the page to show bookmarked recipes


//recipes are returned sorted alphabetically


firebase.initializeApp(config);

const database = firebase.database();

// DOM elements
const button = document.querySelector('.btn'),
      form = document.getElementById('message-form'),
      ul = document.querySelector('.message-board');

// initialize userMessage
let userMessage = "";

form.addEventListener('submit', function() {
  const messageBox = document.getElementById('message');
  
  userMessage = messageBox.value;
  event.preventDefault();

  var dbReference = firebase.database().ref('messages');
  
  dbReference.push({
    message: userMessage,
    votes: 0
  });
  
  messageBox.value = '';
  
});


database.ref('messages').on('value', function (results) {
  ul.innerHTML = '';
  let allMessages = results.val();
  
  for(var messageID in allMessages){
    //console.log(messageID);
    //console.log(allMessages[messageID].message);
    
    let li = document.createElement('li'),
        boardMessage = allMessages[messageID].message,
        trashIcon = `<i class="fa fa-trash pull-right delete"></i>`,
        editIcon = `<i class="fa fa-pencil pull-right edit" data-toggle="modal" data-target="#editModal"></i>`; 
    
    li.innerHTML = `${boardMessage} ${trashIcon} ${editIcon}`;
    li.setAttribute('data-id', messageID);
    
    ul.appendChild(li);
  }
  deletr();
  editr();
});

function deletr() {
  const deleteMe = document.querySelectorAll('.delete');
  //console.log(deleteMe);
  deleteMe.forEach(element => {
    element.addEventListener('click', function() {
      let removeLi = this.parentNode,
          dataID = removeLi.getAttribute('data-id'),
          messageReference =  database.ref('messages/' + dataID);
      
      messageReference.remove();     
    });
  }); 
}

function editr() {
  const editMe = document.querySelectorAll('.edit');
  
  editMe.forEach(element => {
   element.addEventListener('click', function() {
     let updateLi = this.parentNode,
          dataID = updateLi.getAttribute('data-id'),
          messageReference =  database.ref('messages/' + dataID);
     
     const updateMessageForm = document.getElementById('edit-message');
     
     updateMessageForm.addEventListener('submit', function() {
       
       
       
       let newMessageBox = document.getElementById('updatedMessage'),
           updatedMessage = newMessageBox.value,
           modalBox = document.getElementById('editModal');
       
       event.preventDefault();
       messageReference.update({
         message: updatedMessage
       });
       
       //modalBox.modal('hide');
       newMessageBox.value = '';
       ul.innerHTML = '';
     });
     
   });
  });
}

