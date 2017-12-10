$(pageLoad)

$('#new_user').on('submit', function(event) {
  event.preventDefault()
  let data = {
    first_name: event.target.first_name.value,
    last_name: event.target.last_name.value,
    neighborhood: event.target.neighborhood.value,
    user_name: event.target.user_name.value,
    password: event.target.password.value,
    }

  $.post('/db/users', data)
  .then(function() {
    pageLoad()
  })
})
