///   PUTTING LOCALSTORAGE IN VAR   ///
var currentUser = JSON.parse(localStorage.getItem("currentUserKey"));
let neighborhoods= [];

///   ADDING CROP TO PROFILE PAGE   ///
var theTemplateScript = $('#user-produce-handlebars').text();
var theTemplate = Handlebars.compile(theTemplateScript);

$('#new-crop').submit(function(event) {
  event.preventDefault();

  let data = {
    user_id: currentUser.id,
    crop_name: $('#crop').val(),
    quantity_available: event.target.quantity.value,
    quantity_reserved: 0,
    crop_price: event.target.crop_price.value
  }

  $.post('/crops', data)
  .then(function() {
    $.get(`/crops/${currentUser.id}`)
    .then(function(data) {
      let index = data.length -1;
      let theCompiledHtml = theTemplate(data[index]);
      $('#table').before(`<tr>${theCompiledHtml}</tr>`);
    })
  });
});

///   GETTING USER PROFILE  ///
function profilePopulate() {
  let nbhd = neighborhoods.find(function(neighborhood) {
    return(neighborhood.neighborhood_id == currentUser.neighborhood_id);
  });

  $('<form>').fadeIn().appendTo('#profile-container').attr('id', 'profile-form');
  $('<fieldset>').appendTo('#profile-form').attr('id', 'profile-fieldset');
  $('<legend>').appendTo('#profile-fieldset').html("Profile Info");
  $('<div>').appendTo('#profile-fieldset').addClass('profile-div');

  $('.profile-div').append('<label>First Name:</label>').append(`<span>${currentUser.first_name}`);

  $('.profile-div').append('<label>Last Name:</label>').append(`<span>${currentUser.last_name}`);

  $('.profile-div').append('<label>Neighborhood:</label>').append(`<span>${nbhd.neighborhood_name}`);

  $('.profile-div').append('<label>User Name:</label>').append(`<span>${currentUser.user_name}`);

};
///   GETTING NEIGHBORHOODS FROM DB   ///
$(document).ready(function() {
  $.get('/neighborhoods').then(function(neighborhoodList) {
    neighborhoods= neighborhoodList;

      profilePopulate();
  })

  $.get(`/crops/${currentUser.id}`)
  .then(function(data) {

    data.forEach(function(item) {
      var theCompiledHtml = theTemplate(item);
      $('#table').before(`<tr>${theCompiledHtml}</tr>`);
    });
  })
});

function removeCrop (id) {
  $.ajax({
    url:`/crops/${id}`,
    type: 'DELETE'})

  .then(function(response) {
    console.log(response);
    $(`#crop-id${id}`).remove();
  })
}
