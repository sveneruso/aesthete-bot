const Twit = require("twit");
const downloadImage = require("../../downloadImage");

const AestheteBot = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

module.exports = async function postStatus(status, image) {
  const base64image = await downloadImage(image);
  AestheteBot.post("media/upload", { media_data: base64image }, (err, data) => {
    const mediaId = data.media_id_string;
    const meta_params = {
      media_id: mediaId,
      alt_text: { text: status.split("\n")[0] }
    };

    AestheteBot.post("media/metadata/create", meta_params, error => {
      if (!error) {
        const params = {
          status,
          media_ids: [mediaId]
        };

        AestheteBot.post("statuses/update", params, error => {
          if (error) {
            console.error(error);
          }
        });
      }
    });
  });
};
