$(document).ready(function() {
  populateCrops();
})

function populateCrops() {
$.get('/crops').then(function(cropData) {
  console.log(cropData);
  cropData.forEach(function (ele) {
    var $option = $('<option>').attr('value', ele.crop_name).text(ele.crop_name);
      $('#produce-location-options').append($option)
    })
});
}
