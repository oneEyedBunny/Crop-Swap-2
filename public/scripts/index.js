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

//FUNCTION to define an array for the list of neighborhoods from teh DB & then to get the list of neighbhorhood names for drop down boxes on the index/profile page
let neighborhoods= [];
$(document).ready(function() {
$.get('/neighborhoods').then(function(neighborhoodList) {
  console.log(neighborhoodList);
  neighborhoods= neighborhoodList;
  })
})

//function that creates the new user form when join now button is clicked
function createAccountForm() {
  $('#login-user').hide();
  $('#new-user').hide();

  var $newForm = $('<form>').fadeIn().appendTo('#profile-forms');
  $newForm.attr('id', 'new-user-info');

  var $newFieldset = $('<fieldset>').appendTo('#new-user-info');
  $newFieldset.attr('id', 'new-user-fieldset');

  var $newLegend = $('<legend>').appendTo('#new-user-fieldset').html("Profile Info");
  var $newDiv = $('<div>').appendTo('#new-user-fieldset').addClass('new-user-div');

  var $labelA = $('<label>').appendTo('.new-user-div').html("First Name: ");
  var $inputA = $('<input>').appendTo('.new-user-div').attr("name", "firstName");
  var $labelB = $('<label>').appendTo('.new-user-div').html("Last Name: ");
  var $inputB = $('<input>').appendTo('.new-user-div').attr("name", "lastName");
  var $labelC = $('<label>').appendTo('.new-user-div').html("Neighborhood: ");
  var $inputC = $('<select>').appendTo('.new-user-div').attr("name", "neighborhood_id").addClass('neighborhoodDropDown');

  neighborhoods.forEach(function (element) {
    var $option = $('<option>').attr('value', element.neighborhood_id).text(element.neighborhood_name)
    $('.neighborhoodDropDown').append($option)
  })

  var $labelD = $('<label>').appendTo('.new-user-div').html("User Name: ");
  var $inputD = $('<input>').appendTo('.new-user-div').attr("name", "userName");
  var $labelE = $('<label>').appendTo('.new-user-div').html("Password: ");
  var $inputE = $('<input>').appendTo('.new-user-div').attr("name", "password");

  var $newFormButton = $('<input>').attr({
    type: "button",
    value: "Create Profile",
    id: "new-profile-button"
  }).addClass("new-profile-submit-button").appendTo('#new-user-fieldset');

  // function to submit user details into the user objects and clear the new user form from the screen
  $newFormButton.on('click', function(event) {
    event.preventDefault();
    console.log(event.target.form.neighborhood_id.value);
    let data = {
      first_name: event.target.form.firstName.value,
      last_name: event.target.form.lastName.value,
      neighborhood_id: event.target.form.neighborhood_id.value,
      user_name: event.target.form.userName.value,
      password: event.target.form.password.value,
    };

    $.post('/user', data)
    .then(function(newData) {
        console.log(newData);
        data.id = newData.user_id;
        localStorage.setItem("currentUserKey", JSON.stringify(data)); //adds to local storage
      window.location = "profile.html";
    })
  })
};

//function to validate the username/password inputs to see if the user has an account
function loginUser() {
  let form = document.login_user;
  let userNameInput = form.userName.value;
  let passwordInput = form.password.value;
  //let userMatch = userProfile.find (function (profile) {
  $.get('/user').then(function(profiles) {
    userMatch = profiles.find( function(profile) {
      return ((profile.user_name == userNameInput) && (profile.password == passwordInput))
    }
    );
    if(!userMatch) {
      let $instructions = $('<p>').appendTo('#profile-forms').html("No account found. Please create an account below.");
      createAccountForm ();
    } else {
      localStorage.setItem("currentUserKey", JSON.stringify(userMatch)); //adds to local storage
      window.location = "profile.html";
    }
  });
}
