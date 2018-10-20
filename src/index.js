require("dotenv").config();

global.URLSearchParams = require("url").URLSearchParams;

const express = require("express");
const passport = require("passport");
const BasicStrategy = require("passport-http").BasicStrategy;

const login = require("./services/artsy/login");
const createTweet = require("./createTweet");
const postStatus = require("./services/twitter/postStatus");

const app = express();

passport.use(
  new BasicStrategy((username, password, done) => {
    if (
      username !== process.env.HTTP_AUTH_USERNAME ||
      password !== process.env.HTTP_AUTH_PASSWORD
    ) {
      return done(null, false, { message: "Incorrect username or password." });
    } else {
      return done(null, username);
    }
  })
);

app.get(
  "/",
  passport.authenticate("basic", { session: false }),
  async (request, response) => {
    try {
      const token = await login();
      const tweet = await createTweet(token);
      if (tweet.text.length > 280) {
        console.error(JSON.stringify(tweet, null, 4));
      } else {
        await postStatus(tweet.text, tweet.image);
        response.send("New tweet posted!");
      }
    } catch (error) {
      console.error(error);
    }
  }
);

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Aesthete Bot running on port ${app.get("port")}`);
});
