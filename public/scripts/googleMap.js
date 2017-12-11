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
};

$(document).ready(function() {
  makeRequest();
});

function makeRequest() {
  $.get('/neighborhoods', function(data) {
    const mapData = data.map(function(neighborhood) {
      return getCoord(neighborhood.address);
    });
    console.log(mapData);
    // $('#map').text(data);
  })
}

function getCoord(address) {
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode( { 'address': address}, function(results, status) {

    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      alert(latitude);
      return {lat: latitude, lng: longitude};

    }
  });

}


//-----------
// var map;
//       function initMap() {
//         map = new google.maps.Map(document.getElementById('map'), {
//           zoom: 2,
//           center: new google.maps.LatLng(2.8,-187.3),
//           mapTypeId: 'terrain'
//         });
//
//         // Create a <script> tag and set the USGS URL as the source.
//         var script = document.createElement('script');
//         // This example uses a local copy of the GeoJSON stored at
//         // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//         script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
//         document.getElementsByTagName('head')[0].appendChild(script);
//       }
//
//       // Loop through the results array and place a marker for each
//       // set of coordinates.
//       window.eqfeed_callback = function(results) {
//         for (var i = 0; i < results.features.length; i++) {
//           var coords = results.features[i].geometry.coordinates;
//           var latLng = new google.maps.LatLng(coords[1],coords[0]);
//           var marker = new google.maps.Marker({
//             position: latLng,
//             map: map
//           });
//         }
//       }
