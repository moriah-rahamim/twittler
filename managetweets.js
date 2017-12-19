// Post a tweet with the given message from the current user
var postTweet = function(message) {
  var tweet = {};
  tweet.user = 'memyselfandi';
  tweet.message = message;
  tweet.created_at = new Date();
  addTweet(tweet);
  addNewTweets();
};

// Create a tweet jQuery object and return it
var makeTweet = function(tweet) {
  var username = tweet.user;
  var timestamp = " - " + moment(tweet.created_at).fromNow();
  var message = tweet.message;

  var $tweet = $('<div></div>');
  $tweet.addClass('row tweet');

  var $avatar = $('<img></img>');
  $avatar.addClass('avatar');
  $avatar.attr('src', 'assets/avatar.png');
  $tweet.append($avatar);

  var $content = $('<div></div>');
  $content.addClass('content');
  $tweet.append($content);

  var $username = $('<a></a>');
  $username.addClass('username');
  $username.data('user', username);
  $username.attr('href', '#');
  $username.text('@' + username);
  $content.append($username);

  var $timestamp = $('<span></span>');
  $timestamp.addClass('timestamp');
  $timestamp.text(timestamp);
  $content.append($timestamp);

  var $message = $('<div></div>');
  $message.text(message);
  $content.append($message);

  return $tweet;
};

// Find out what the current stream is: Home, or a particular user
var getStream = function() {
  var streamName = $('.current-view').data('stream');
  if (streamName === 'home') {
    return streams.home;
  } else {
    return streams.users[streamName];
  }
};

// Pull all un-loaded tweets and put them in the DOM
var addNewTweets = function() {
  var stream = getStream();
  var $tweets = $('.tweets');
  
  while (index < stream.length) {

  var tweet = stream[index];
  var $tweet = makeTweet(tweet);
  $tweet.prependTo($tweets);

  index ++;
  }

  // Remove (*) from title
  $('title').text('Twittler');

  // Remove "See New Tweets" row from top of page
  var $newTweets = $('a.refresh-tweets');
  $newTweets.addClass('hidden');
};

// Check if there are new un-loaded tweets
// If yes, add (*) to the title and show the "see new tweets" button
var checkForNewTweets = function() {
  var stream = getStream();

  if(index < stream.length) {
    // Add (*) to title to indicate new tweets
    $('title').text('(*) Twittler');

    // Add "See New Tweets" row to top of page
    var $newTweets = $('a.refresh-tweets');
    $newTweets.removeClass('hidden');
  }
};

var clearTweets = function() {
  $('.tweets').html('');
  $('a.refresh-tweets').addClass('hidden');
  index = 0;
};

// Switch to a different stream. Either Home, or a particular user
var switchToStream = function(stream) {
  clearTweets();
  $('.current-view').data('stream', stream.toLowerCase());
  var streamName;
  if(stream !== 'Home') {
    streamName = '@' + stream;
  } else {
    streamName = stream;
  }
  $('.current-view').text(streamName);
  addNewTweets();
}