var $newCropInfo = $('#submit-crop');
$newCropInfo.on('click', function(event) {
  event.preventDefault();
  var currentUserId = JSON.parse(localStorage.getItem("currentUserKey")).id;
  let data = {
    user_id: currentUserId,
    crop_name: event.target.form.crop.value,
    quantity_available: event.target.form.quantity.value, 
    quantity_reserved: 0, 
    crop_price: event.target.form.crop_price.value
  }
  $.post('/crops', data);
});


// 'use strict';

// $(document).ready(function() {
//     var currentUser = JSON.parse(localStorage.getItem("currentUserKey"));
//     if (currentUser != null) {
//        var container = $('#profile-container');
//        var elPicture  = $('img');
//        elPicture.id = "user-picture";
//        elPicture.src = currentUser.img;
//        container.append(elPicture);
//        var elUserPicture = $('p');
//        elUserPicture.html('Update your picture: ');
//        container.append(elUserPicture);
//        var elUpdatePicture = $('input').attr('type' ,'file' ,'accept' ,'.jpg, .jpeg, .png');
//        container.append(elUpdatePicture);
//        elUpdatePicture.on('change', handlePicture);

//        var $firstLastName = $('p');
//        nameLabel = $('label').text("Name: ");
//        $firstLastName.append(nameLabel);

//        var $firstName = $('span').attr('contenteditable', true).text(currentUser.firstName).on('input, handleFirstName');
//        $firstLastName.append($firstName);

//        var $lastName = $('span').attr('contenteditable',true).text(currentUser.lastName).on('input', handleLastName);
//        $firstLastName.append($lastName);
//        container.append($firstLastName);

//        var $userName = $('p');
//        container.append($userName);
//        var $userNameLabel = $($userName).text('Username: ');
//        $userName.append($userNameLabel);

//        var $userNameSpan = $('span').attr('contenteditable', true).text(currentUser.userName);
//        $userName.append($userNameSpan);
//        $userNameSpan.on('input', handleUserName);

//        var $neighborhood = $('p');
//        container.append($neighborhood);
//        var $userNeighborhood = $('label').text('Neighborhood: ');
//        container.append($userNeighborhood);
//        var $neighborhoodSpan = $('span').attr('contenteditable', true).text(currentUser.neighborhood).on('input', handleNeighborhood);
    

//   function handleUserName (event) {
//     currentUser.userName = event.target.innerText;
//     localStorage.setItem("currentUserKey", JSON.stringify(currentUser));
//   }
  
//   function handleNeighborhood (event) {
//     currentUser.neighborhood = event.target.innerText;
//     localStorage.setItem("currentUserKey", JSON.stringify(currentUser));
//   }

//   function handleFirstName (event) {
//     currentUser.firstName = event.target.innerText;
//     localStorage.setItem("currentUserKey", JSON.stringify(currentUser));
//   }
  
//   function handleLastName (event) {
//     currentUser.lastName = event.target.innerText;
//     localStorage.setItem("currentUserKey", JSON.stringify(currentUser));
//   }
// };


// function handlePicture(event) {
//     if(event.target.files.length > 0) {
//         var file = event.target.files[0];
//         var reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.on('load', function() {
//             var base64image = reader.results;
//             $('user-picture').src(base64image);
//             localStorage.setItem('currentUserKey', JSON.stringify(currentUser));
//         }) 
//     }
// }