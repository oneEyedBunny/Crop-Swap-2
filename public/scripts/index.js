//Object constructor for a new user
var UserProfile = function (firstname, lastname, username, password, neighborhood, picture, cropIndexes){
  this.firstName = firstname;
  this.lastName = lastname;
  this.userName = username;
  this.password = password;
  this.neighborhood = neighborhood;
  this.img = picture;
  this.crops = cropIndexes;
}

//Array of user objects
var userProfile = [];
// userProfile.push(new UserProfile("Allyson", "Short", "Allyson", "Short", "NorthEast", "images/oneeyedbunny.jpg", [0,1,4,6,7]));
localStorage.setItem("user-profiles", JSON.stringify(userProfile));

//FUNCTION TO GET the list of neighbhorhood names
$(document).ready(function() {
$.get('/neighborhood').then(function(neighborhoodList) {
  console.log(neighborhoodList);//store this in an array and use it later
  neighborhoodList.forEach(function (element) {
    var $option = $('<option>').attr('value', element.neighbhorhood_name).text(element.neighborhood_name)
    $('.neighborhoodDropDown').apend($option)
  })
})
})



//function that creates the new user form when join now button is clicked
$('#new-user').on('click', function() {
  $('#login-user').hide();
  $('#new-user').hide();

  var $newForm = $('<form>').fadeIn().appendTo('#profile-forms');
  $newForm.attr('id', 'new-user-info');

  var $newFieldset = $('<fieldset>').appendTo('#new-user-info');
  $newFieldset.attr('id', 'new-user-fieldset');

  var $newLegend = $('<legend>').appendTo('#new-user-fieldset').html("Profile Info");

  var $labelA = $('<label>').appendTo('#new-user-fieldset').html("First Name: ");
  var $inputA = $('<input>').appendTo('#new-user-fieldset').attr("name", "firstName");
  var $labelB = $('<label>').appendTo('#new-user-fieldset').html("Last Name: ");
  var $inputB = $('<input>').appendTo('#new-user-fieldset').attr("name", "lastName");
  var $labelC = $('<label>').appendTo('#new-user-fieldset').html("Neighborhood: ");
  var $inputC = $('<select>').appendTo('#new-user-fieldset').attr("name", "neighborhood_id").addClass('neighborhoodDropDown');


  var $labelD = $('<label>').appendTo('#new-user-fieldset').html("User Name: ");
  var $inputD = $('<input>').appendTo('#new-user-fieldset').attr("name", "userName");
  var $labelE = $('<label>').appendTo('#new-user-fieldset').html("Password: ");
  var $inputE = $('<input>').appendTo('#new-user-fieldset').attr("name", "password");

  var $newFormButton = $('<input>').attr({
    type: "button",
    value: "Create Profile",
    id: "new-profile-button"
  }).addClass("new-profile-submit-button").appendTo('#new-user-fieldset');


  // function to submit user details into the user objects and clear the new user form from the screen
  $newFormButton.on('click', function(event) {
    event.preventDefault()
    let data = {
      first_name: event.target.form.firstName.value,
      last_name: event.target.form.lastName.value,
      neighborhood_id: event.target.form.neighborhood_id.value,
      user_name: event.target.form.userName.value,
      password: event.target.form.password.value,
    }
    localStorage.setItem("currentUserKey", JSON.stringify(data)); //adds to local storage

    $.post('/user', data)
    .then(function(id) {
      console.log(id);
      window.location = "profile.html";
    })
  })
});

//function to validate the username/password inputs to see if the user has an account
function loginUser() {
  var form = document.login_user;
  var userNameInput = form.Username.value;
  var passwordInput = form.Password.value;
  var userMatch = userProfile.find (function (profile) {
    return((profile.userName == userNameInput) && (profile.password == passwordInput))
  });
  if(!userMatch) {
    var instructions = document.createElement("p");
    instructions.innerText = "No account found. Please create an account below.";
    createAccountForm (instructions);
  } else {
    localStorage.setItem("currentUserKey", JSON.stringify(userMatch)); //adds to local storage
    window.location = "profile.html";
  }
}
