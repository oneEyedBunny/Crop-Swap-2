$(document).ready(function() {
  $.get('/crops').then(function(cropData) {
    console.log(cropData);
  })
})
