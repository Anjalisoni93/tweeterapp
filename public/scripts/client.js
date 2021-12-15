/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  $(".submit-tweet").submit(function(event) {
    event.preventDefault();
    loadTweets();
  });

  function loadTweets() {
    $.ajax({
      url: "/tweets",
      method: "POST",
      data: {
        text: "anjalisoni",
        user:"Anjali Soni"
      },
      dataType: "json",
      success: function(data) {
        renderTweets(data);
      }
    });
  }

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $('.tweet-container').append($tweet);
    }
  };

  const createTweetElement  = function(tweet) {
    const $tweet = $(`
    <section class="tweet-container">
          <article class="tweet">
            <header>
            <div class="profile">
              <img src="${tweet.user.avatars}" class="usericon">  
              <span class="uname">${tweet.user.name}</span>
            </div>
              <span class="atuser">${tweet.user.handle}</span>
            </header>
            <div>
              <h4>${tweet.content.text}</h4>
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
        </section>
    `);
    return $tweet;
  };
  renderTweets(data);
  
});

