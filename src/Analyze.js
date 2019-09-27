const Tweets = require("./clients/Tweets");
const WatsonNLU = require("./clients/WatsonNLU");
class Analyze {

	/**
	 * get tweets using a specificed search term
	 * @param {string} searchTerm - The search term to get tweets for. For example: @Delta.
	 * @param {boolean} doFilterRetweets - Whether to filter out retweets.
	 * @param {number} totalTweets - How many tweets to return
	 * @return {Promise} A Promise Object that represents the sentiments of the tweets.
	*/
	static getSentimentFromTwitter(searchTerm, doFilterRetweets, totalTweets) {
		return Tweets.getTweets(searchTerm, doFilterRetweets, totalTweets)
			.then((tweets) => {
				let promises = [];
				for (let tweet of tweets.statuses) {
					promises.push(WatsonNLU.getSentiment(tweet.full_text));
				}

				// Wait for all the asynchronous NLU requests to finish so we can look at all the text at once
				return Promise.all(promises)
					.catch(error => {
						console.error(error)
					});
			})
	}

	/**
	 * get tweets using a specificed search term
	 * @param {string} nluResults - The array result returned from the NLU client.
	 * @return {Object} A sentiment object that holds the the most negative score.
	*/
	static getWorst(nluResults) {
		let initialAccumulator = {
			sentiment: {
				document: {
					score: 1,
				}
			},
			analyzed_text: "initialAccumulator"
		}
		// Use reduce to take all the scores and reduce them to a single object (the one with the worst score)
		return nluResults.reduce((accumulator, currentValue) => {
			// Some tweet text comes through that NLU cannot parse, we have to hadle those undefined cases
			if (typeof currentValue === "undefined") {
				return accumulator;
			}

			return currentValue.sentiment.document.score < accumulator.sentiment.document.score ? currentValue : accumulator
		}, initialAccumulator);
	}
}
module.exports = Analyze;