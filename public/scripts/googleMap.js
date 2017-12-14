'use strict'

var map;
var marker = new google.maps.Marker();

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

function infoWindow () {
  var contentString = '<div id="content"' + '<h1 id="firstHeading">Portland</h1>' + '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}


$(document).ready(function() {
  initMap();
  handleCrops();
  infoWindow();
});
