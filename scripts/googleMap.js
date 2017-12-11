'use strict'
// var markers = [
//   carrots: [
//     {location:'8300 SE 15th Ave, Portland, OR 97202', availQty: 5},
//     {location:'1825 SW Broadway, Portland, OR 97201', availQty: 7}
//   ],
//   kale: [
//     {location:'8300 SE 15th Ave, Portland, OR 97202', availQty: 10},
//     {location:'1825 SW Broadway, Portland, OR 97201', availQty: 12}
//   ]
// ];

var map;

function initMap() {
  var portland = {lat: 45.5231, lng: -122.6765};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: portland
  });

  var marker = new google.maps.Marker({
    position: portland,
    map: map
  });
}


$(document).ready(function() {
  $('#ajax-button').on("click", makeRequest);
});

function makeRequest() {
  $.get('/neighborhoods', function(data) {
    $('#map').text(data);
  })
}
