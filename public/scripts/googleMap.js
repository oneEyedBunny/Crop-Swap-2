'use strict'

var map;

function initMap() {
  var portland = {lat: 45.5231, lng: -122.6765};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: portland
  })
};

$(document).ready(function() {
  makeRequest();
});

function makeRequest() {
  $.get('/neighborhoods', function(data) {
      data.forEach(function(neighborhood) {
      addMarker(neighborhood);
    });
  })
}

function addMarker(neighborhood) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( { 'address': neighborhood.address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: neighborhood.neighborhood_name
      });
    }
  });
}
