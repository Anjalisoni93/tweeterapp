// Word counter
$(document).ready(function() {
  $('textarea').on('input', function() {
    let lengthOfWords = $(this).val().length;
    let $counter = $(this).parent('form').find('.counter');
    updateCountdown($counter, lengthOfWords);
  });
});

// Update words per count
function updateCountdown($counter, len) {
  let charsLeft = 140 - len;
  $counter.text(charsLeft);
  $counter.css('color', 'black');
  if (charsLeft < 0) {
    $counter.css('color', 'red');
  }
}

