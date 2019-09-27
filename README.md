# Kabanero example using the Node.js Express Collection
This application uses the Twitter API to get tweets representing the `SEARCH_TERM` in `app.js`. Then it sends the tweets through the Watson Natural Language Understanding service to get a sentiment score for each tweet. 

The `SEARCH_TERM` is meant to be updated locally so you can experience the real time hot reloading development experience that Kabanero provides (when code is changed and the file is saved).

**Note**: This repository is already initialized with the Kabanero Node.js Express `v0.2.5` [Collection](https://github.com/kabanero-io/collections#collections) by using the `appsody init` command.

## Prereqs

1. [Appsody CLI](https://appsody.dev/docs/getting-started/installation)
1. A Watson NLU service instance
   1. [Create a Watson NLU instance](https://cloud.ibm.com/catalog/services/natural-language-understanding)
      * There is a **free** "lite" plan available
   1. On the NLU Dashboard, view the **Service Credentials** and click **View Credentials** 
      * Note the `apikey` and the `url` because you will need them for your `.env` file
1. A Twitter Developer account
   1. [Create a twitter developer account](https://developer.twitter.com/)
   1. [Create a Twitter app](https://developer.twitter.com/en/apps) to get the API keys required for this application.
      * In the app click **Keys and tokens** and take a note of all 4 values. You will need these for your `.env` file.

## Create your env

1. Clone this repository
   * `git clone git@github.com:alohr51/Kabanero-Watson-Twitter-Example.git`
1. On the repository root create a file called `.env` and copy and paste the below content into the file. Be sure to replace
the `<XX_XX_XX>` values with your credentials noted from the Prereqs step above. **Do not commit this file to git.**
```
TWITTER_CONSUMER_KEY=<YOUR_TWITTER_CONSUMER_KEY>
TWITTER_CONSUMER_SECRET=<YOUR_TWITTER_CONSUMER_SECRET>
TWITTER_ACCESS_TOKEN_KEY=<YOUR_TWITTER_ACCESS_TOKEN_KEY>
TWITTER_ACCESS_TOKEN_SECRET=<YOUR_TWITTER_ACCESS_TOKEN_SECRET>

NLU_URL=<YOUR_NLU_URL>
NLU_API_KEY=<YOUR_NLU_API_KEY>
```

## Run the app

1. Using the Appsody CLI we can run the app and start the development experience
   1. In a terminal make sure you are at this repositories root
   1. Run the command: `appsody run --docker-options "--env-file .env"`
      * The `--docker-options` flag will pass along the options to the `docker run` command, this includes telling Docker about our env file. Docker will set these env variables for us on start.
      * Learn More about the [appsody run](https://appsody.dev/docs/using-appsody/cli-commands#appsody-run) command.

1. In the output from the `appsody run` command, Appsody will tell you what port the application was started on.
   * For example: `[Container] App started on PORT 3000` means you can access your app in your browser at `localhost:3000`
   * Give the app a second to load (it does the API requests on load)

## Experience the app

Go change the `SEARCH_TERM` in `app.js` and save the file, you will notice Appsody will restart your container with updated code right away. Go ahead and refresh your browser and you will see results from your new search term.

## Conclusion

Appsody is only a part of Kabanero, but it is the main development experience associated with Kabanero. To learn more, please visit [Kabanero.io](https://kabanero.io).