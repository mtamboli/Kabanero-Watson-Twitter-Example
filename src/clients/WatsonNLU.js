const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1.js');

// Setup the NLU Client. This requires your API key from the Watson NLU Service
const NLU_CLIENT = new NaturalLanguageUnderstandingV1({
	iam_apikey: process.env.NLU_API_KEY,
	version: '2018-04-05',
	url: process.env.NLU_URL
});

class WatsonNLU {

	/**
	 * get sentiment from text
	 * @param {string} text - The text to get sentiment for.
	 * @return {Promise} A Promise Object that represents the sentiment object from Watson.
	*/
	static getSentiment(text) {
		return NLU_CLIENT.analyze(
			{
				text,
				language: "en",
				return_analyzed_text: true,
				features: {
					sentiment: {}
				}
			}).catch(error => {
				console.log(error.message)
			});
	}
}

module.exports = WatsonNLU;