const axios = require("axios");

module.exports = async function getArtist(token, url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "X-XAPP-Token": token
      }
    });

    const artists = response.data._embedded.artists;
    return artists.length === 0
      ? {
          id: "",
          name: "Anonymous"
        }
      : {
          id: artists[0].id,
          name: artists[0].name
        };
  } catch (error) {
    console.error(error);
  }
};
