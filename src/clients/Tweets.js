const Twitter = require('twitter');

// Setup the Twitter Client. This requires twitter credentials from your Twitter developer account
const TWITTER_CLIENT = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

class Tweets {

	/**
	 * get tweets using a specificed search term
	 * @param {string} searchTerm - The search term to get tweets for. For example: @Delta.
	 * @param {boolean} doFilterRetweets - Whether to filter out retweets.
	 * @param {number} totalTweets - How many tweets to return
	 * @return {Promise} A Promise Object that represents the tweets.
	*/
	static getTweets(searchTerm, doFilterRetweets, totalTweets) {
		let filterRetweets = doFilterRetweets ? " -filter:retweets" : "";
		// https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets.html
		return TWITTER_CLIENT.get('search/tweets',
			{
				q: encodeURIComponent(searchTerm) + filterRetweets,
				lang: "en",
				count: totalTweets,
				tweet_mode: "extended"
			}
		);
	}
}
module.exports = Tweets;