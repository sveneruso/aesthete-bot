require("dotenv").config();

global.URLSearchParams = require("url").URLSearchParams;

const login = require("./services/artsy/login");
const createTweet = require("./createTweet");
const postStatus = require("./services/twitter/postStatus");

async function bot() {
  try {
    const token = await login();
    const tweet = await createTweet(token);
    if (tweet.text.length > 280) {
      console.error(JSON.stringify(tweet, null, 4));
    } else {
      postStatus(tweet.text, tweet.image);
    }
  } catch (error) {
    console.error(error);
  }
}

bot();
