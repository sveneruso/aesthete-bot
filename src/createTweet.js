const getRandomArtwork = require("./services/artsy/getRandomArtwork");
const getArtist = require("./services/artsy/getArtist");
const utils = require("./utils");

module.exports = async function createTweet(token) {
  const artwork = await getRandomArtwork(token);
  const artist = await getArtist(token, artwork.artistLink);
  return {
    text: utils.appendHashtags(
      utils.appendMediumAndArtworkImageRights(
        utils.appendArtworkDate(
          `${utils.manipulateInfo(artwork.title)} - ${artist.name}`,
          artwork.date
        ),
        artwork.medium,
        artwork.imageRights
      ),
      artwork.category
    ),
    image: artwork.imageLink
  };
};
