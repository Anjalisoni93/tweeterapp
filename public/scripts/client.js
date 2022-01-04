/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
$('#error').hide();
loadTweets();
  $(".submit-tweet").submit(function(event) {
    event.preventDefault();
    let formData = $(this).serialize();
    //console.log("something happens here", formData);
    let tweetArea = $('#tweet-area').val();
    //console.log("Checking text", tweetArea);

    if (tweetArea === '') {
      // Adding error message using jQuery
      $('#error').slideDown();
      $('#error').html('<i class="fas fa-exclamation-triangle"></i>  Please enter a text first!  <i class="fas fa-exclamation-triangle"></i>');
    } else if (tweetArea.length > 140) {
      $('#error').slideDown();
      $('#error').html('<i class="fas fa-exclamation-triangle"></i> This message is way too long! <i class="fas fa-exclamation-triangle"></i>');
    } else if (tweetArea.match(/^ *$/) !== null) {
      $('#error').slideDown();
      $('#error').html('<i class="fas fa-exclamation-triangle"></i> Please dont leave too much space! <i class="fas fa-exclamation-triangle"></i>');
    } else {
      $.ajax({
        url: '/tweets',
        method: 'POST',
        data: formData
      }).done(function() {
        $('#text-area').val('');
        $('.counter').html(140);
        $(".submit-tweet").trigger("reset")
        loadTweets();
        console.log("Ajax request loaded successfully!");
      })
    }
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function(data) {
        console.log("Data loaded succesfully!", data);
        renderTweets(data);
      }
    });
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet); // prepend means on top
    }
  };

  // to prevent XSS with escaping
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement  = function(tweet) {
    const $tweet = $(`
          <article class="tweet">
            <header>
            <div class="profile">
              <img src="${tweet.user.avatars}" class="usericon">  
              <span class="uname">${tweet.user.name}</span>
            </div>
              <span class="atuser">${tweet.user.handle}</span>
            </header>
            <div>
              <h4>${escape(tweet.content.text)}</h4>
            </div>
            <footer class="footercontent">
              ${timeago.format(tweet.created_at)}
                <span class="icons">
                  <i class="fas fa-flag"></i>
                  <i class="fas fa-retweet"></i>
                  <i class="fas fa-heart"></i>
                </span>
            </footer>
          </article>
    `);
    return $tweet;
  };  
});

