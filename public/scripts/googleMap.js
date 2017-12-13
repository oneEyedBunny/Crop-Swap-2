'use strict'

var map;

function initMap() {
  var portland = {lat: 45.5231, lng: -122.6765};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: portland
  })
};

function handleCrops() {
  $('#produce-location-options').change(function() {
    var selectedCrop = $('#produce-location-options option:selected').text();
    console.log(selectedCrop);
    $.get(`/locations/${selectedCrop}`).then(function(locationData) {
      console.log(locationData);
      locationData.forEach(function (location) {
        addMarker(location)
      })
    })
  })
}

function addMarker(location) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( { 'address': location.address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: location.neighborhood_name
      });
    }
  });
}



$(document).ready(function() {
  initMap();
  handleCrops();
});
