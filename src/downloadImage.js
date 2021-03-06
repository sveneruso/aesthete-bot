const axios = require("axios");

module.exports = async function downloadImage(url) {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer"
    });

    return Buffer.from(response.data, "binary").toString("base64");
  } catch (error) {
    console.error(error);
  }
};
