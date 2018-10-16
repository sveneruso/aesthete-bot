import "dotenv/config";

import { URLSearchParams } from "url";

global.URLSearchParams = URLSearchParams;

import login from "./services/artsy/login";
import createTweet from "./createTweet";

async function bot() {
  try {
    const token = await login();
    const tweet = await createTweet(token);
    if (tweet.text.length > 280) {
      console.error(JSON.stringify(tweet, null, 4));
    } else {
      console.log(JSON.stringify(tweet, null, 4));
    }
  } catch (error) {
    console.error(error);
  }
}

bot();
