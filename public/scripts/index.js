//Object constructor for a new user
let UserProfile = function (firstname, lastname, username, password, neighborhood, picture, cropIndexes){
  this.firstName = firstname;
  this.lastName = lastname;
  this.userName = username;
  this.password = password;
  this.neighborhood = neighborhood;
  this.img = picture;
  this.crops = cropIndexes;
}

let userProfile = [];
let neighborhoods= [];

//Function to get the list of neighbhorhood names for drop down box on the index/profile page
$(document).ready(function() {
  $.get('/neighborhoods').then(function(neighborhoodList) {
    neighborhoods= neighborhoodList;
  })
});

//function that creates the new user form when join now button is clicked
function createAccountForm() {
  $('#login-user').hide();
  $('#new-user').hide();

  $('<form>').fadeIn().appendTo('#profile-forms').attr('id', 'new-user-info');
  $('<fieldset>').appendTo('#new-user-info').attr('id', 'new-user-fieldset');
  $('<legend>').appendTo('#new-user-fieldset').html("Profile Info");
  $('<div>').appendTo('#new-user-fieldset').addClass('new-user-div');

  $('<label>').appendTo('.new-user-div').html("First Name: ");
  $('<input>').appendTo('.new-user-div').attr("name", "firstName");
  $('<label>').appendTo('.new-user-div').html("Last Name: ");
  $('<input>').appendTo('.new-user-div').attr("name", "lastName");
  $('<label>').appendTo('.new-user-div').html("Neighborhood: ");
  $('<select>').appendTo('.new-user-div').attr("name", "neighborhood_id").addClass('neighborhoodDropDown');
  neighborhoods.forEach(function (element) {
    let $option = $('<option>').attr('value', element.neighborhood_id).text(element.neighborhood_name)
    $('.neighborhoodDropDown').append($option)
  })
  $('<label>').appendTo('.new-user-div').html("User Name: ");
  $('<input>').appendTo('.new-user-div').attr("name", "userName");
  $('<label>').appendTo('.new-user-div').html("Password: ");
  $('<input>').appendTo('.new-user-div').attr("name", "password").attr("type","password");

  let $newFormButton=$('<input>').attr({
    type: "button",
    value: "Create Profile",
    id: "new-profile-button"
  }).addClass("new-profile-submit-button").appendTo('#new-user-fieldset');

  // function to submit user details into the user object and clear the new user form from the screen
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
      localStorage.setItem("currentUserKey", JSON.stringify(data));
      window.location = "profile.html";
    })
  })
};

//function to validate the username/password inputs to see if the user has an account
function loginUser() {
  let form = document.login_user;
  let userNameInput = form.userName.value;
  let passwordInput = form.password.value;
  $.get('/user').then(function(profiles) {
    userMatch = profiles.find( function(profile) {
      return ((profile.user_name == userNameInput) && (profile.password == passwordInput))
    }
  );
  if(!userMatch) {
    $('<p>').appendTo('#profile-forms').addClass('error-message').html("We could not find an account. Please create one here -----> ");
    createAccountForm ();
  } else {
    localStorage.setItem("currentUserKey", JSON.stringify(userMatch));
    window.location = "profile.html";
  }
})
};
