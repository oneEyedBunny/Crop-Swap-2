'use strict'

var map;
var marker;

function initMap() {
  var portland = {lat: 45.5231, lng: -122.6765};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: portland,
    // mapTypeId: google.maps.MapTypeId.ROADMAP
  })
};

function handleCrops() {
  $('#produce-location-options').change(function() {
    var selectedCrop = $('#produce-location-options option:selected').text();
    console.log(selectedCrop);
    $.get(`/locations/${selectedCrop}`).then(function(locationData) {
      console.log(locationData);
      locationData.forEach(function (location) {
        addMarker(location);
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

      marker = new google.maps.Marker({
        position: {lat: latitude, lng: longitude},
        map: map,
        title: location.neighborhood_name
      });

      var contentString = '<div id="content">' + `<h1 id="address">${location.address}</h1>` + '</div>'
      + `<h4 id="swap_day">${location.swap_day}<h4>` + `<h4 id="swap_time">${location.swap_time}<h4>`;
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      // console.log(marker);

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  });
}

$(document).ready(function() {
  initMap();
  handleCrops();
});
