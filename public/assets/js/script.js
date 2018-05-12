$('#submit-btn').on('click', function(e) {
  e.preventDefault();

  var newSurvey = {
    name: $('#name')
      .val()
      .trim(),
    photo: $('#photo')
      .val()
      .trim(),
    scores: []
  };

  $('.question').each(function() {
    newSurvey.scores.push(parseInt($(this).val()));
  });
  
  console.log(newSurvey);
  $.ajax({
    method: 'POST',
    url: '/api/friends',
    data: newSurvey
  }).then(function(pickedFriend) {
    console.log(pickedFriend);
    if (pickedFriend.found) {
      $('.match-name').text(pickedFriend.name);
      $('#match-image').attr('src', pickedFriend.photo);
      $('#answer-modal').modal('show');
    }
  });
});

$(document).on('click', '#delete-btn', function() {
  var friendId = $(this).attr('data-id');

  $.ajax({
    method: 'DELETE',
    url: '/api/friends/' + friendId
  })
    .done(function(data) {
      console.log(data);
      $('[data-id = ' + friendId + ']').remove();
    })
    .catch(function(err) {
      console.log(err);
    });
});