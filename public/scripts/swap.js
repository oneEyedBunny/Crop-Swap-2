'use strict'

var map;
var marker;
var markers = [];

function initMap() {
  var portland = {lat: 45.5231, lng: -122.6765};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: portland,
  })
};


function populateCrops() {
$.get('/crops').then(function(cropData) {
  console.log(cropData);
  cropData.forEach(function (ele) {
    var $option = $('<option>').attr('value', ele.crop_name).text(ele.crop_name);
      $('#crop-options').append($option)
    })
});
}


//function to hanlde click from user selecting a crop
function handleCrops() {
  $('#crop-options').change(function() {
    var selectedCrop = $('#crop-options option:selected').text();
    console.log(selectedCrop);
    $.get(`/locations/${selectedCrop}`).then(function(locationData) {
      console.log(locationData);
      deleteMarkers();
      locationData.forEach(function (location) {
        addMarker(location);
      })
    })
    $.get(`/crop-sellers/${selectedCrop}`).then(function(sellers) {
      console.log(sellers);
      var $tbody = $('#sellers-table tbody');
      $tbody.html('');

      sellers.forEach(function (seller) {
      $tbody.append(`
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          <tr>
            <td>${seller.first_name}</td>
            <td>${seller.quantity_available} ${seller.crop_name}</td>
            <td>$${seller.crop_price}</td>
          </tr>
          `);
      });
    })
  })
}

//function to add a marker on the map depending on the selected crop
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

      markers.push(marker);

      var contentString = '<div class="content">'
      + `<p id="neighborhood">${location.neighborhood_name}</p>`
      + `<p id="address">${location.address}</p>`
      + `<p id="swap_day">${location.swap_day}s</p>`
      + `<p id="swap_time">${location.swap_time}</p>`
      + '</div>';
      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      marker.addListener('click', function() {
        infowindow.open(map, marker);
      });
    }
  });
}


//Functions to delete markers from map if user selects a different crop
function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
      }

function clearMarkers() {
      setMapOnAll(null);
    }

function deleteMarkers() {
       clearMarkers();
       markers = [];
     }


$(document).ready(function() {
  initMap();
  handleCrops();
  populateCrops();
});
