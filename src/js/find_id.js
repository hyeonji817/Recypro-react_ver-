$("#name").focusout(function() {
  if($('#name').val() == "") {
    $('#check').text('이름을 입력해 주세요.');
    $('#check').css('color', 'red');
  } else {
    $('#check').hide();
  }
});

$('#email').focusout(function() {
  if($('#email').val() == "") {
    $('#check').text('이메일을 입력해 주세요.');
    $('#check').css('color', 'red');
  } else {
    $('#check').hide();
  }
});