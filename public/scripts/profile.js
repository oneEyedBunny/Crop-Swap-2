'use strict';

$(document).ready(function() {
    currentUser = JSON.parse(localStorage.getItem("currentUserKey"));
    if (currentUser != null) {
       var container = $('#profile-container');
       var elPicture  = $('img');
       elPicture.id = "user-picture"
       elPicture.src = currentUser.img;
       container.append(elPicture);
       var elUserPicture = $('p');
       elUserPicture.html('Update your picture: ');
       container.append(elUserPicture);
       var elUpdatePicture = $('input').attr('type' ,'file' ,'accept' ,'.jpg, .jpeg, .png');
       container.append(elUpdatePicture);
       elUpdatePicture.on('change', handlePicture);

       var $firstLastName = $('p');
       var nameLabel = $('label').text("Name: ");
       $firstLastName.append(nameLabel);

       var $firstName = $('span').attr('contenteditable', true).text(currentUser.firstName).on('input, handleFirstName');
       $firstLastName.append($firstName);

       var $lastName = $('span').attr('contenteditable',true).text(currentUser.lastName).on('input', handleLastName);
       $firstLastName.append($lastName);
       container.append($firstLastName);

       var $userName = $('p');
       container.append($userName);
       var $userNameLabel = $('label').text('Username: ');
       $userName.append($userNameLabel);

       var $userNameSpan = $('span').attr('contenteditable', true).text(currentUser.userName);
       $userName.append($userNameSpan);
       $userNameSpan.on('input', handleUserName);

       var $neighborhood = $('p');
       container.append($neighborhood);
       var $userNeighborhood = $('label').text('Neighborhood');
       $neighborhood.append($userNeighborhood);
       var $neighborhoodSpan = $('span').attr('contenteditable', true).text(currentUser.neighborhood).on('input', handleNeighborhood);
    }
};

profileContainer();