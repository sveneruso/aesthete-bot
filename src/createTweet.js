import getRandomArtwork from "./services/artsy/getRandomArtwork";
import getArtist from "./services/artsy/getArtist";
import {
  appendArtworkDate,
  appendHashtags,
  appendMediumAndArtworkImageRights,
  manipulateInfo
} from "./utils";

export default async function createTweet(token) {
  const artwork = await getRandomArtwork(token);
  const artist = await getArtist(token, artwork.artistLink);
  return {
    text: appendHashtags(
      appendMediumAndArtworkImageRights(
        appendArtworkDate(
          `${manipulateInfo(artwork.title)} - ${artist.name}`,
          artwork.date
        ),
        artwork.medium,
        artwork.imageRights
      ),
      artwork.category
    ),
    image: artwork.imageLink
  };
}
