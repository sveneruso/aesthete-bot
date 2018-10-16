import axios from "axios";

const ARTWORKS_API_ENDPOINT = "https://api.artsy.net/api/artworks";

export default async function getRandomArtwork(token) {
  try {
    const response = await axios.get(ARTWORKS_API_ENDPOINT, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XAPP-Token": token
      },
      params: new URLSearchParams({
        client_id: process.env.ARTSY_CLIENT_ID,
        client_secret: process.env.ARTSY_CLIENT_SECRET,
        sample: 1
      })
    });

    const data = response.data;
    const artwork = {
      id: data.id,
      title: data.title,
      category: data.category,
      medium: data.medium,
      date: data.date,
      imageRights: data.image_rights,
      artistLink: data._links.artists.href
    };
    const image = data._links.image;
    if (image) {
      const imageLink = data._links.image.templated
        ? data._links.image.href.replace(
            "{image_version}",
            data.image_versions[0]
          )
        : data._links.image.href;
      return { ...artwork, imageLink };
    } else {
      console.error(
        `No image found for artwork ${JSON.stringify(artwork, null, 4)}`
      );
    }
  } catch (error) {
    console.error(error);
  }
}
